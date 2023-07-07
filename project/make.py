import os, shutil
from dotenv import load_dotenv


def _buildHeaders(dir, subdomain):
    fileExtensions = ["js", "json", "css"]
    website = f"https://{subdomain}.pages.dev/"
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


def _buildGoogleAuth(dir, auth):
    with open(f"{dir}{auth}", "w") as file:
        file.write(f"google-site-verification: {auth}")


def _buildBingAuth(dir, auth):
    with open(f"{dir}BingSiteAuth.xml", "w") as file:
        file.write('<?xml version="1.0">\n')
        file.write("<users>\n")
        file.write(f"   <user>{auth}</user>\n")
        file.write("</users>")


def _buildWebsite(rootDir):
    print(rootDir)
    srcDir = rootDir + splitSymbol + "webpage" + splitSymbol
    buildDir = rootDir + splitSymbol + "output" + splitSymbol

    shutil.copytree(srcDir, buildDir, dirs_exist_ok=True)
    print("Copied Webpage Folder")
    
    subdomain = os.getenv("CLOUDFLARE_PAGES_SUBDOMAIN")
    if(not (len(subdomain) == 0)):
        _buildHeaders(buildDir, subdomain)
        print("_headers Build")
    else:
        print("Skipped _headers file")

    googleAuth = os.getenv("GOOGLE_SEACHCONSOLE_AUTH")
    if(not (len(googleAuth) == 0)):
        _buildGoogleAuth(buildDir, googleAuth)
        print("Google Auth File Built")
    else:
        print("Skipped Google Search Console Auth File")

    bingAuth = os.getenv("BING_WEBMASTER_AUTH")
    if(not (len(bingAuth) == 0)):
        _buildBingAuth(buildDir, bingAuth)
        print("Bing Auth File Built")
    else:
        print("Skipped Bing Webmaster Auth File")

    print("Build Finished")    


if(__name__ == "__main__"):
    # Gets working directory
    workingDir = os.getcwd()

    # Gets correct symbol for filepath
    # '/' for Unix & '\' for Windows
    splitSymbol = '/'
    if('\\' in workingDir):
        splitSymbol = '\\'

    # Checks if make script is running in root of Git project
    if(workingDir.split(splitSymbol)[-1] == "BTD6ParagonCalculator"):
        # Loads env file
        load_dotenv(dotenv_path=(workingDir+splitSymbol+".env"))

        workingDir += splitSymbol + "project"
        _buildWebsite(workingDir)
    else:
        print("Please open make file from root directory of the Git project")
    input("Press enter to close")