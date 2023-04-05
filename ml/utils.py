import whois
import numpy as np
import datetime
from urllib.parse import urlparse
import re


def extract_features(url):
    parsed_url = urlparse(url)
    path = parsed_url.path

    length_url = len(url)
    length_hostname = len(parsed_url.hostname)
    nb_dots = url.count(".")
    nb_hyphens = url.count("-")
    nb_eq = url.count("=")
    nb_underscore = url.count("_")
    nb_percent = url.count("%")
    nb_comma = url.count(",")
    ratio_digits_url = sum(c.isdigit() for c in url) / len(url)
    longest_words_raw = max((len(word) for word in re.findall(r"\w+", url)), default=0)
    longest_word_host = max(
        (len(word) for word in re.findall(r"\w+", parsed_url.hostname)), default=0
    )
    longest_word_path = max((len(word) for word in re.findall(r"\w+", path)), default=0)
    domain_in_title = int(parsed_url.hostname in path)
    domain_with_copyright = int("©" in parsed_url.hostname)
    domain_registration_length = get_domain_registration_length(parsed_url.hostname)

    return np.array(
        [
            length_url,
            length_hostname,
            nb_dots,
            nb_hyphens,
            nb_eq,
            nb_underscore,
            nb_percent,
            nb_comma,
            ratio_digits_url,
            longest_words_raw,
            longest_word_host,
            longest_word_path,
            domain_in_title,
            domain_with_copyright,
            domain_registration_length,
        ]
    )


def get_domain_registration_length(hostname):
    domain = hostname.split(".")[-2] + "." + hostname.split(".")[-1]

    try:
        w = whois.whois(domain)
        if w.creation_date:
            registration_date = w.creation_date
        else:
            registration_date = w.creation_date()[0]
        delta = datetime.datetime.now() - registration_date
        domain_registration_length = delta.days
    except:
        domain_registration_length = -1

    return domain_registration_length
