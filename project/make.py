"""
Build script for the BTD6 Paragon Calculator website.
"""

import os
import shutil
from enum import Enum
from pathlib import Path
from datetime import datetime
from dotenv import load_dotenv

# Loads .env file
load_dotenv()


class TerminalColours(Enum):
    """Enum of basic terminal colours"""

    OK = "\033[92m"
    NO = "\033[91m"
    WARN = "\033[93m"
    BOLD = "\033[1m"
    END = "\033[0m"


def print_terminal(string: str, c: TerminalColours):
    """
    Prints a string to the terminal with specified terminal colours.

    Parameters:
    string (str): The string to be printed.
    c (terminalColours): The terminal colours to be applied to the string.

    Returns:
    None
    """
    print(f"{c.value}{string}{TerminalColours.END.value}")


def build_headers(dest_dir, website):
    """
    Constructs _headers file.

    Parameters:
    dest_dir (str): The destination directory for the _headers file.
    website (str): The website URL.

    Returns:
    None
    """
    file_extensions = ["js", "json", "css"]
    robot_tag = "    X-Robots-Tag: noindex\n"

    with open(f"{dest_dir}_headers", "w", encoding="utf-8") as file:
        for x in file_extensions:
            file.write(f"{website}*.{x}\n")
            file.write(robot_tag)

        if os.getenv("BING_WEBMASTER_AUTH"):
            file.write(f"{website}BingSiteAuth.xml\n")
            file.write(robot_tag)

        if google_auth := os.getenv("GOOGLE_SEARCHCONSOLE_AUTH"):
            file.write(f"{website}{google_auth}\n")
            file.write(robot_tag)


def build_sitemap(dest_dir, website, project_dir):
    """
    Constructs sitemap.xml file.

    Parameters:
    dest_dir (str): The destination directory for the sitemap.xml file.
    website (str): The website URL.
    project_dir (str): The project directory.

    Returns:
    None
    """
    epoc_time = datetime.fromtimestamp(Path(project_dir).stat().st_mtime)
    mod_time = str(epoc_time).split(" ", maxsplit=1)[0]

    with open(f"{dest_dir}sitemap.xml", "w", encoding="utf-8") as file:
        file.write('<?xml version="1.0" encoding="UTF-8"?>\n')
        file.write('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n')
        file.write("    <url>\n")
        file.write(f"       <loc>{website}</loc>\n")
        file.write(f"       <lastmod>{mod_time}</lastmod>\n")
        file.write("    </url>\n")
        file.write("</urlset>")


def build_google_auth(dest_dir, auth):
    """
    Constructs Google Auth File.

    Parameters:
    dest_dir (str): The destination directory for the Google Auth File.
    auth (str): The Google Auth Code.

    Returns:
    None
    """
    with open(f"{dest_dir}{auth}", "w", encoding="utf-8") as file:
        file.write(f"google-site-verification: {auth}")


def build_bing_auth(dest_dir, auth):
    """
    Constructs Bing Auth File.

    Parameters:
    dest_dir (str): The destination directory for the Bing Auth File.
    auth (str): The Bing Auth Code.

    Returns:
    None
    """
    with open(f"{dest_dir}BingSiteAuth.xml", "w", encoding="utf-8") as file:
        file.write('<?xml version="1.0">\n')
        file.write("<users>\n")
        file.write(f"   <user>{auth}</user>\n")
        file.write("</users>")


def build_robots_txt(dest_dir):
    """
    Constructs robots.txt file.

    Parameters:
    dest_dir (str): The destination directory for the robots.txt file.

    Returns:
    None
    """
    with open(f"{dest_dir}robots.txt", "w", encoding="utf-8") as file:
        file.write("User-agent: *\n")
        file.write("Disallow: /*.css\n")
        file.write("Disallow: /scripts\n")
        file.write("Disallow: /paragondetails\n")
        file.write("Disallow: /paragoncosts\n")
        if os.getenv("WEBSITE"):
            file.write(f"Sitemap: {os.getenv('WEBSITE')}sitemap.xml")


def build_website():
    """
    Initiates the build of the website.
    """
    src_dir = "project/webpage/"
    build_dir = "project/output/"

    # Deletes project folder if it exists
    if os.path.exists(build_dir):
        shutil.rmtree(build_dir)

    # Copies website into output folder
    shutil.copytree(src_dir, build_dir, dirs_exist_ok=True)
    print_terminal("Copied Webpage Folder", TerminalColours.OK)

    # Creates robots.txt
    build_robots_txt(build_dir)
    print_terminal("Robots.txt Built", TerminalColours.OK)

    # Adds _headers and sitemap.xml
    website = os.getenv("WEBSITE")
    if website:
        build_headers(build_dir, website)
        print_terminal("_headers Built", TerminalColours.OK)

        build_sitemap(build_dir, website, src_dir)
        print_terminal("Sitemap Built", TerminalColours.OK)
    else:
        print_terminal("Skipped _headers and Sitemap Files", TerminalColours.NO)

    # Adds Google and Bing Auth Files
    google_auth = os.getenv("GOOGLE_SEARCHCONSOLE_AUTH")
    if google_auth:
        build_google_auth(build_dir, google_auth)
        print_terminal("Google Auth File Built", TerminalColours.OK)
    else:
        print_terminal("Skipped Google Search Console Auth File", TerminalColours.NO)

    bing_auth = os.getenv("BING_WEBMASTER_AUTH")
    if bing_auth:
        build_bing_auth(build_dir, bing_auth)
        print_terminal("Bing Auth File Built", TerminalColours.OK)
    else:
        print_terminal("Skipped Bing Webmaster Auth File", TerminalColours.NO)

    print_terminal("Build Finished", TerminalColours.BOLD)


def main():
    """
    Main functin for static file build.
    """

    # Gets working directory
    working_dir = os.getcwd()

    # Gets correct symbol for filepath
    # '/' for Unix & '\' for Windows
    split_symbol = "/"
    if "\\" in working_dir:
        split_symbol = "\\"

    # Checks if build script is running in root of Git project
    if working_dir.split(split_symbol)[-1] == "BTD6ParagonCalculator":
        working_dir += f"{split_symbol}project"
        print_terminal("Build Initiated", TerminalColours.BOLD)
        build_website()
    else:
        print_terminal(
            "Please open build file from root directory of the Git project",
            TerminalColours.WARN,
        )


if __name__ == "__main__":
    main()
