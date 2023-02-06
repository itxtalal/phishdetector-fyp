import urllib

url = "HTTP://www.example.com/index.php?value1=123&value2=456#fragment"


def normalize_url(url: str) -> str:
    parsed_url = urllib.parse.urlparse(url)
    normalized_url = urllib.parse.urlunparse(
        urllib.parse.ParseResult(
            scheme=parsed_url.scheme.lower(),
            netloc=parsed_url.netloc.lower(),
            path=urllib.parse.quote(parsed_url.path),
            # params=parsed_url.params,
            # query=urllib.parse.quote_plus(parsed_url.query),
            # fragment=urllib.parse.quote(parsed_url.fragment),
        )
    )
    return normalized_url
