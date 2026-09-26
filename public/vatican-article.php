<?php
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: private, max-age=300');

$url = isset($_GET['url']) ? trim((string) $_GET['url']) : '';
if (!preg_match('#^https://www\\.vaticannews\\.va/pt/[A-Za-z0-9_./-]+\\.html$#', $url)) {
  http_response_code(400);
  echo json_encode(['paragraphs' => []], JSON_UNESCAPED_UNICODE);
  exit;
}

function vatican_fetch($url) {
  if (function_exists('curl_init')) {
    $ch = curl_init($url);
    curl_setopt_array($ch, [
      CURLOPT_RETURNTRANSFER => true,
      CURLOPT_FOLLOWLOCATION => true,
      CURLOPT_MAXREDIRS => 4,
      CURLOPT_TIMEOUT => 15,
      CURLOPT_USERAGENT => 'Mozilla/5.0 (compatible; IgrejaOrtodoxaGrega/1.0)',
    ]);
    $html = curl_exec($ch);
    $code = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    if ($html !== false && $code >= 200 && $code < 300) {
      return $html;
    }
  }

  $context = stream_context_create([
    'http' => [
      'timeout' => 15,
      'header' => "User-Agent: Mozilla/5.0 (compatible; IgrejaOrtodoxaGrega/1.0)\r\n",
    ],
  ]);
  $html = @file_get_contents($url, false, $context);
  return $html !== false ? $html : '';
}

function vatican_paragraphs($html) {
  if ($html === '' || strpos($html, 'id="root"') !== false || strpos($html, 'Ative o JavaScript no navegador') !== false) {
    return [];
  }
  $start = strpos($html, 'class="article__text"');
  if ($start === false) {
    return [];
  }
  $slice = substr($html, $start, 40000);
  if (!preg_match_all('#<p(?:\\s[^>]*)?>[\\s\\S]*?</p>#i', $slice, $matches)) {
    return [];
  }
  $paragraphs = [];
  foreach ($matches[0] as $tag) {
    $text = html_entity_decode(strip_tags($tag), ENT_QUOTES | ENT_HTML5, 'UTF-8');
    $text = trim(preg_replace('/\\s+/u', ' ', $text));
    if ($text === '' || $text === 'Vatican News') {
      continue;
    }
    if (stripos($text, 'Ative o JavaScript') !== false) {
      continue;
    }
    if (strpos($text, 'Obrigado por ter lido') === 0) {
      break;
    }
    $paragraphs[] = $text;
  }
  return $paragraphs;
}

echo json_encode(['paragraphs' => vatican_paragraphs(vatican_fetch($url))], JSON_UNESCAPED_UNICODE);
