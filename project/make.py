import os, shutil
from pathlib import Path
from datetime import datetime
from dotenv import load_dotenv

# Loads .env file
load_dotenv()

class terminalColours:
    OK = '\033[92m'
    NO = '\033[91m'
    WARN = '\033[93m'
    BOLD = '\033[1m'
    END = '\033[0m'


def _buildHeaders(dir, website):
    fileExtensions = ["js", "json", "css"]
    robotTag = "    X-Robots-Tag: noindex\n"

    with open(f"{dir}_headers", "w") as file:
        for x in fileExtensions:
            file.write(f"{website}*.{x}\n")
            file.write(robotTag)
        
        file.write(f"{website}BingSiteAuth.xml\n")
        file.write(robotTag)

        if(not (len(os.getenv("GOOGLE_SEACHCONSOLE_AUTH")) == 0)):
            file.write(f"{website}{os.getenv('GOOGLE_SEACHCONSOLE_AUTH')}\n")
            file.write(robotTag)


def _buildSitemap(dir, website, projectDir):
    epocTime = datetime.fromtimestamp(Path(projectDir).stat().st_mtime)
    modTime = str(epocTime).split(" ")[0]

    with open(f"{dir}sitemap.xml", "w") as file:
        file.write('<?xml version="1.0" encoding="UTF-8"?>\n')
        file.write('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n')
        file.write('    <url>\n')
        file.write(f'       <loc>{website}</loc>\n')
        file.write(f'       <lastmod>{modTime}</lastmod>\n')
        file.write('    </url>\n')
        file.write('</urlset>')


def _buildGoogleAuth(dir, auth):
    with open(f"{dir}{auth}", "w") as file:
        file.write(f"google-site-verification: {auth}")


def _buildBingAuth(dir, auth):
    with open(f"{dir}BingSiteAuth.xml", "w") as file:
        file.write('<?xml version="1.0">\n')
        file.write("<users>\n")
        file.write(f"   <user>{auth}</user>\n")
        file.write("</users>")


def _buildRobotsTxt(dir):
    with open(f"{dir}robots.txt", "w") as file:
        file.write("User-agent: *\n")
        file.write("Disallow: /*.css\n")
        file.write("Disallow: /scripts\n")
        file.write("Disallow: /paragondetails\n")
        file.write("Disallow: /paragoncosts\n")
        if(os.getenv("WEBSITE")):
            file.write(f"Sitemap: {os.getenv('WEBSITE')}sitemap.xml")


def _buildWebsite():
    srcDir = "project/webpage/"
    buildDir = "project/output/"

    shutil.copytree(srcDir, buildDir, dirs_exist_ok=True)
    print(f"{terminalColours.OK}Copied Webpage Folder{terminalColours.END}")
    
    _buildRobotsTxt(buildDir)
    print(f"{terminalColours.OK}Robots.txt Built{terminalColours.END}")

    website = os.getenv("WEBSITE")
    if(not (len(website) == 0)):
        _buildHeaders(buildDir, website)
        print(f"{terminalColours.OK}_headers Built{terminalColours.END}")

        _buildSitemap(buildDir, website, srcDir)
        print(f"{terminalColours.OK}Sitemap File Built{terminalColours.END}")
    else:
        print(f"{terminalColours.NO}Skipped _headers File{terminalColours.END}")
        print(f"{terminalColours.NO}Skipped Sitemap File{terminalColours.END}")

    googleAuth = os.getenv("GOOGLE_SEACHCONSOLE_AUTH")
    if(not (len(googleAuth) == 0)):
        _buildGoogleAuth(buildDir, googleAuth)
        print(f"{terminalColours.OK}Google Auth File Built{terminalColours.END}")
    else:
        print(f"{terminalColours.NO}Skipped Google Search Console Auth File{terminalColours.END}")

    bingAuth = os.getenv("BING_WEBMASTER_AUTH")
    if(not (len(bingAuth) == 0)):
        _buildBingAuth(buildDir, bingAuth)
        print(f"{terminalColours.OK}Bing Auth File Built{terminalColours.END}")
    else:
        print(f"{terminalColours.NO}Skipped Bing Webmaster Auth File{terminalColours.END}")

    print(f"{terminalColours.BOLD}Build Finished{terminalColours.END}")    

def main():
    # Gets working directory
    workingDir = os.getcwd()

    # Gets correct symbol for filepath
    # '/' for Unix & '\' for Windows
    splitSymbol = '/'
    if('\\' in workingDir):
        splitSymbol = '\\'

    # Checks if build script is running in root of Git project
    if(workingDir.split(splitSymbol)[-1] == "BTD6ParagonCalculator"):
        workingDir += f"{splitSymbol}project"
        print(f"{terminalColours.BOLD}Build Initiated{terminalColours.END}")
        _buildWebsite()
    else:
        print(f"{terminalColours.WARN}Please open build file from root directory of the Git project{terminalColours.END}")
    input(f"{terminalColours.BOLD}Press enter to close{terminalColours.END}")

if(__name__ == "__main__"):
    main()