// src/data/legal.ts

export interface LegalSection {
  heading: string;
  body: string; // markdown
}

export interface LegalPage {
  title: string;
  subtitle: string;
  lastUpdated: string;
  sections: LegalSection[];
  /** Full HTML string from the API — when present, rendered directly instead of section cards */
  htmlContent?: string;
}

export const privacyPolicy: LegalPage = {
  title: "Privacy Policy",
  subtitle: "How we collect, use, and protect your information.",
  lastUpdated: "2024-01-01",
  sections: [
    {
      heading: "1. Information We Collect",
      body: `We collect information you provide directly to us when you:

- Fill out a contact or quote request form
- Send us an email or call us
- Subscribe to our newsletter or updates

The types of information we may collect include your **name**, **email address**, **phone number**, **company name**, and **any other information you choose to provide**.

We may also collect certain information automatically when you visit our website, including your **IP address**, **browser type**, **operating system**, **referring URLs**, and **pages viewed**.`,
    },
    {
      heading: "2. How We Use Your Information",
      body: `We use the information we collect to:

- Respond to your enquiries and provide quotes
- Process and fulfil orders and service requests
- Send you technical notices and support messages
- Communicate with you about products, services, and events
- Monitor and analyse trends and usage on our website
- Comply with legal obligations

We do **not** sell, rent, or share your personal information with third parties for their own marketing purposes.`,
    },
    {
      heading: "3. Cookies",
      body: `We use cookies and similar tracking technologies to:

- Keep you signed in across sessions
- Remember your preferences
- Understand how you use our site (analytics)
- Improve our website and services

You can control cookies through your browser settings or our **Cookie Preferences** panel. Disabling certain cookies may affect the functionality of our website.

| Cookie Type | Purpose | Duration |
|-------------|---------|----------|
| Necessary | Core site functionality | Session |
| Analytics | Usage data (Google Analytics) | 2 years |
| Marketing | Ad targeting and retargeting | 1 year |`,
    },
    {
      heading: "4. Data Retention",
      body: `We retain your personal information for as long as necessary to fulfil the purposes outlined in this policy, unless a longer retention period is required or permitted by law.

Contact form submissions are retained for **3 years**. Order and invoice records are retained for **7 years** in compliance with Indian GST regulations.`,
    },
    {
      heading: "5. Data Security",
      body: `We implement appropriate technical and organisational measures to protect your personal information against unauthorised access, alteration, disclosure, or destruction.

These measures include:

- HTTPS encryption on all pages
- Access controls limiting who can view your data
- Regular security reviews of our systems

However, no method of transmission over the internet is 100% secure. We cannot guarantee absolute security.`,
    },
    {
      heading: "6. Your Rights",
      body: `Under applicable data protection laws, you have the right to:

- **Access** the personal information we hold about you
- **Correct** inaccurate or incomplete information
- **Delete** your personal information (subject to legal obligations)
- **Object** to or restrict processing of your information
- **Withdraw consent** at any time where processing is based on consent

To exercise any of these rights, contact us at [info@bandbindustries.com](mailto:info@bandbindustries.com).`,
    },
    {
      heading: "7. Third-Party Links",
      body: `Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of those sites. We encourage you to read the privacy policies of any third-party sites you visit.`,
    },
    {
      heading: "8. Changes to This Policy",
      body: `We may update this Privacy Policy from time to time. We will notify you of any significant changes by updating the **Last Updated** date at the top of this page. Your continued use of our website after any changes constitutes acceptance of the updated policy.`,
    },
    {
      heading: "9. Contact Us",
      body: `If you have questions or concerns about this Privacy Policy, please contact us:

**B & B Industries**
Jamnagar, Gujarat, India
📧 [info@bandbindustries.com](mailto:info@bandbindustries.com)
📞 +91 00000 00000`,
    },
  ],
};

export const termsOfUse: LegalPage = {
  title: "Terms of Use",
  subtitle: "The rules and conditions governing your use of our website.",
  lastUpdated: "2024-01-01",
  sections: [
    {
      heading: "1. Acceptance of Terms",
      body: `By accessing and using the B & B Industries website at [bandbindustries.com](https://bandbindustries.com), you accept and agree to be bound by these Terms of Use. If you do not agree to these terms, please do not use our website.`,
    },
    {
      heading: "2. Use of the Website",
      body: `You agree to use this website only for lawful purposes and in a manner that does not infringe the rights of others. You must not:

- Use the site in any way that violates applicable local, national, or international laws
- Transmit any unsolicited or unauthorised advertising material
- Attempt to gain unauthorised access to any part of the site or its systems
- Introduce viruses, trojans, worms, or other malicious code
- Scrape, crawl, or extract data from the site without our written permission`,
    },
    {
      heading: "3. Intellectual Property",
      body: `All content on this website — including text, images, logos, graphics, and code — is the property of **B & B Industries** or its content suppliers and is protected by applicable intellectual property laws.

You may not reproduce, distribute, or create derivative works from any content on this site without our prior written consent.

The **B & B Industries** name, logo, and all related product and service names are trademarks of B & B Industries. You may not use them without permission.`,
    },
    {
      heading: "4. Product Information",
      body: `We make every effort to ensure product specifications, pricing, and availability information on this website is accurate. However:

- Specifications are subject to change without notice
- Images are for illustrative purposes only and may not reflect the exact product
- Prices shown are indicative only — final pricing is confirmed at the time of quotation

For confirmed specifications or pricing, please [contact our sales team](/contact).`,
    },
    {
      heading: "5. Disclaimer of Warranties",
      body: `This website is provided on an **"as is"** and **"as available"** basis without any warranties of any kind, either express or implied.

We do not warrant that:

- The website will be uninterrupted or error-free
- Defects will be corrected
- The website or its servers are free of viruses or other harmful components

To the fullest extent permitted by law, we disclaim all warranties, express or implied.`,
    },
    {
      heading: "6. Limitation of Liability",
      body: `To the fullest extent permitted by applicable law, B & B Industries shall not be liable for any:

- Indirect, incidental, or consequential damages
- Loss of profits or revenue
- Loss of data or business interruption

arising from your use of or inability to use this website, even if we have been advised of the possibility of such damages.`,
    },
    {
      heading: "7. Links to Third-Party Sites",
      body: `Our website may contain links to external websites. These links are provided for your convenience only. We have no control over the content of those sites and accept no responsibility for them or for any loss or damage that may arise from your use of them.`,
    },
    {
      heading: "8. Governing Law",
      body: `These Terms of Use are governed by and construed in accordance with the laws of **India**. Any disputes arising from these terms or your use of the website shall be subject to the exclusive jurisdiction of the courts of **Jamnagar, Gujarat, India**.`,
    },
    {
      heading: "9. Changes to Terms",
      body: `We reserve the right to modify these Terms of Use at any time. Changes will be effective immediately upon posting to the website. Your continued use of the website after any changes constitutes your acceptance of the new terms.`,
    },
    {
      heading: "10. Contact",
      body: `For any questions regarding these Terms of Use, please contact us:

**B & B Industries**
Jamnagar, Gujarat, India
📧 [info@bandbindustries.com](mailto:info@bandbindustries.com)`,
    },
  ],
};
