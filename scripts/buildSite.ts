/**
 * Builds necessary public files required for SEO
 * Replicates old make.py file
 * 
 * @author Kaister300
 */

import fs from 'node:fs';
import path from 'node:path';
import dotenv from 'dotenv';

dotenv.config();

enum TerminalColours {
    OK = "\x1b[92m",
    NO = "\x1b[91m",
    WARN = "\x1b[93m",
    BOLD = "\x1b[1m",
    END = "\x1b[0m",
}


/**
 * Prints text to stdout with specific terminal colours
 * @param text String to be printed
 * @param colour Colour / Effect applied to text
 */
function printTerminal(text: string, colour: TerminalColours) {
    console.log(`${colour}${text}${TerminalColours.END}`);
}


/**
 * Constructs sitemap.xml file
 * @param targetDir The destination directory for the sitemap.xml file
 * @param website The website URL
 */
function buildSitemap(targetDir: string, website: string) {
    const buildDate = new Date();
    const modTime = `${buildDate.getUTCFullYear()}-${buildDate.getUTCMonth()}-${buildDate.getUTCDate()}`;
    const xmlData = "".concat(
        "<?xml version='1.0' encoding='UTF-8'?>\n",
        "<urlset xmlns='http://www.sitemaps.org/schemas/sitemap/0.9'>\n",
        "   <url>\n",
        `       <loc>${website}</loc>\n`,
        `       <lastmod>${modTime}</lastmod>\n`,

        "   </url>\n",
        "</urlset>"
    );
    const fileName = path.resolve(targetDir, "sitemap.xml");
    fs.writeFileSync(fileName, xmlData);
}


/**
 * Constructs robots.txt file
 * @param targetDir The destination directory for the robots.txt file
 * @param website The website URL
 */
function buildRobotsTxt(targetDir: string, website?: string) {
    let robotData = "".concat(
        "User-agent: *\n",
        "Disallow: /assets\n"
    );
    if (website) robotData = robotData.concat(`Sitemap: ${website}sitemap.xml`);
    const fileName = path.resolve(targetDir, "robots.txt");
    fs.writeFileSync(fileName, robotData);
}


/**
 * Constructs Google Auth File
 * @param targetDir The destination directory for the Google Auth File
 * @param auth The Google Auth Code
 */
function buildGoogleAuth(targetDir: string, auth: string) {
    const authData = `google-site-verification: ${auth}`;
    const fileName = path.resolve(targetDir, auth);
    fs.writeFileSync(fileName, authData);
}


/**
 * Constructs Bing Auth File
 * @param targetDir The destination directory for the Bing Auth File
 * @param auth The Bing Auth Code
 */
function buildBingAuth(targetDir: string, auth: string) {
    const bingData = "".concat(
        '<?xml version="1.0"?>\n',
        "<users>\n",
        `   <user>${auth}</user>\n`,
        "</users>"
    );
    const fileName = path.resolve(targetDir, "BingSiteAuth.xml");
    fs.writeFileSync(fileName, bingData);
}


/**
 * Build function for pages
 */
function buildStaticPages() {
    const targetDir = path.resolve(__dirname, "..", "public");

    if (!fs.existsSync(targetDir)) {
        throw new Error("Please fully initalise repository before running pre-build script.");
    }

    const WEBSITE = process.env["WEBSITE"];
    if (WEBSITE) {
        buildSitemap(targetDir, WEBSITE);
        printTerminal("Sitemap Built", TerminalColours.OK);
    } else {
        printTerminal("Skipped Sitemap File", TerminalColours.WARN);
    }

    buildRobotsTxt(targetDir, WEBSITE);
    printTerminal("Robots.txt Built", TerminalColours.OK);

    const GOOGLE_AUTH = process.env["GOOGLE_SEARCHCONSOLE_AUTH"];
    if (GOOGLE_AUTH) {
        buildGoogleAuth(targetDir, GOOGLE_AUTH);
        printTerminal("Google Auth File Built", TerminalColours.OK);
    } else {
        printTerminal("Skipped Google Search Console Auth File", TerminalColours.WARN);
    }

    const BING_AUTH = process.env["BING_WEBMASTER_AUTH"];
    if (BING_AUTH) {
        buildBingAuth(targetDir, BING_AUTH);
        printTerminal("Bing Auth File Built", TerminalColours.OK);
    } else {
        printTerminal("Skipped Bing Webmaster Auth File", TerminalColours.WARN);
    }

    printTerminal("Build Finished", TerminalColours.BOLD);
}


/**
 * Main function to build SEO & other static files for site
 */
function main() {
    printTerminal("Build Initiated", TerminalColours.BOLD);
    try {
        buildStaticPages();
    } catch (err) {
        printTerminal(`Error Occurred: ${err}`, TerminalColours.NO);
        printTerminal("Build Failed", TerminalColours.NO);
    }
}

main();