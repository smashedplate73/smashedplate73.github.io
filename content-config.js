// Website Content Configuration
// Edit this file to easily update text content throughout the site
const currentYear = new Date().getFullYear();

const SiteContent = {
    // Site Information
    artistName: "Smashedplate",
    commissionStatus: {
        status: "CLOSED", // "OPEN", "CLOSED", or "HIATUS"
        slots: {
            current: 3,
            total: 3
        }
    },
    
    // Contact Information
    contact: {
        email: "smashedplate73@gmail.com",
        instagram: "smashedplate21",
        discord: "smashedplate21"
    },
    
    // Hero Section
    hero: {
        title: "Hey, I'm Smashedplate!",
        subtitle: "Furry Character Artist",
        description: "Hi! I'm Smashedplate, a digital artist specializing in furry character art. I create everything from quick sketches to detailed reference sheets and full illustrations.",
        primaryButton: "View Commissions",
        secondaryButton: "Get in Touch"
    },
    
    // Commission Types
    commissions: {
        sketch: {
            name: "Sketch",
            priceRange: "£5 - £12.50",
            prices: [
                "Bust up - £5",
                "Half body - £7", 
                "Full body - £10",
                "Color - +£2.50"
            ],
            turnaround: "3-5 days"
        },
        
        lineart: {
            name: "Rendered Lineart",
            priceRange: "£30 - £50",
            prices: [
                "Bust up - £30",
                "Half body - £40",
                "Full body - £50"
            ],
            turnaround: "1-2 weeks"
        },
        
        painting: {
            name: "Full Painting", 
            priceRange: "Contact for pricing",
            prices: [
                "Bust up - Contact for quote",
                "Half body - Contact for quote",
                "Full body - Contact for quote"
            ],
            turnaround: "2-3 weeks"
        },
        
        emotes: {
            name: "Emotes",
            priceRange: "£8 - £30",
            prices: [
                "Single emote (320x320 + 128x128) - £8",
                "Pack of 5 emotes - £30"
            ],
            turnaround: "1 week"
        },
        
        referenceSheet: {
            name: "Reference Sheet",
            priceRange: "£50+",
            baseOptions: [
                "Full body angle + close up + 3-5 expressions - £50",
                "Back full body angle - £30",
                "Full body side angle - £15",
                "Accessory / close up - £10",
                "Each additional accessory / close up - £5*"
            ],
            addOns: [
                "Poses with accessory - £35",
                "Shading - £10"
            ],
            note: "*Price dependent on detail complexity",
            turnaround: "3-4 weeks"
        }
    },
    
    // Modifiers and Add-ons
    modifiers: [
        "Additional characters - +50% starting price per character",
        "NSFW content - +50% starting price",
        "Gradient + simple pattern background - FREE",
        "Simple background - +£10",
        "Complex background - +£25"
    ],
    
    // Special Offers
    specialOffers: [
        "5 sketches bundle - £30 (save £20!)",
        "5 colored sketches bundle - £40 (save £22.50!)"
    ],
    
    // Commission Process
    process: [
        "Send inquiry with character details",
        "Receive quote & timeline estimate", 
        "Sketch creation & approval",
        "Payment through PayPal after sketch approval",
        "Completion & final delivery"
    ],
    
    // Terms of Service
    tos: {
        acceptance: {
            title: "Commission Acceptance & Denial",
            items: [
                "I reserve the right to deny any commission request for any reason",
                "Please ensure your request aligns with my artistic capabilities and comfort level",
                "Complex mechanical designs or subjects outside my expertise may be declined"
            ]
        },
        
        payment: {
            title: "Payment Terms",
            items: [
                "Payment is required after sketch approval via PayPal only",
                "No refunds will be provided once payment has been made",
                "Commission prices may increase based on complexity of the requested work",
                "Rush orders may incur additional fees - please inquire for availability"
            ]
        },
        
        process: {
            title: "Commission Process & Revisions",
            items: [
                "Please have pose references and character reference images ready before commissioning",
                "Major changes (full body adjustments, pose changes) can only be made during the sketch phase",
                "Minor changes (small details, accessories) are acceptable during the lineart phase",
                "Only color and lighting adjustments can be made after the lineart phase",
                "Excessive revisions beyond reasonable scope may incur additional charges"
            ]
        },
        
        nsfw: {
            title: "NSFW Content Guidelines", 
            items: [
                "NSFW commissions are accepted with a +50% price modifier",
                "Valid government-issued photo ID verification is required for all NSFW commissions",
                "Extreme content, illegal material, or anything against my personal boundaries will be declined",
                "Client must be 18+ for any NSFW content"
            ]
        },
        
        rights: {
            title: "Usage Rights & Artist Rights",
            items: [
                "Completed artwork is for personal use only unless commercial rights are specifically purchased",
                "Client may post artwork on social media with proper credit to the artist",
                "Artist retains the right to display completed work in portfolio and promotional materials",
                "Artwork may not be used for NFTs, cryptocurrency, or blockchain technologies without explicit permission",
                "Commercial licensing is available - please inquire for separate pricing"
            ]
        },
        
        delivery: {
            title: "Delivery & Communication",
            items: [
                "Estimated turnaround times are provided but may vary due to commission complexity",
                "Regular updates will be provided at major milestones",
                "Final artwork delivered as high-resolution files in agreed-upon format",
                "Delays may occur due to health issues, emergencies, or unforeseen circumstances",
                "Client will be notified promptly of any significant delays"
            ]
        }
    },
    
    // Contact Form
    contactForm: {
        title: "Get in Touch",
        subtitle: "Ready to commission?",
        description: "Fill out the form below with your commission details, or reach out via your preferred platform!",
        formNote: "I'll get back to you within 24-48 hours with a quote and timeline estimate!"
    },
    
    // Footer
    footer: {
        copyright: "Art: ©"+currentYear+" Smashedplate. | Website: ©"+currentYear+" C0rrupt10n. | All rights reserved.",
        links: ["Instagram", "Email", "Discord"]
    }
};

// Export for use in modules or make globally available
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SiteContent;
} else {
    window.SiteContent = SiteContent;
} 