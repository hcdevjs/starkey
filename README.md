# Josh Starkey Music Website

A modern, responsive website for musician Josh Starkey, featuring event management, music integration, and a dark theme design.

## Features

- 🎵 Music integration with Spotify embeds
- 📅 Interactive event calendar with management system
- 🌙 Dark theme design
- 📱 Fully responsive layout
- 🎨 Dynamic image carousel
- 🔄 Reusable components (navigation, footer)
- 📝 Contact form
- 🔗 Social media integration

## Project Structure

````
docs/
├── assets/
│   ├── css/
│   │   ├── styles.css      # Main stylesheet
│   │   └── calendar.css    # Calendar-specific styles
│   ├── js/
│   │   ├── app.js         # Core application logic (loads nav/footer)
│   │   ├── calendar.js    # Calendar functionality
│   │   ├── main.js       # Additional JavaScript
│   │   └── manage-events.js # Event management script
│   ├── data/
│   │   └── events.json   # Calendar events data
│   └── img/
│       ├── hero-*.png    # Hero carousel images
│       └── *.jpg        # Other site images
├── index.html           # Home page
├── about.html           # About the artist
├── music.html         # Music and Spotify embeds
├── events.html       # Events calendar
├── contact.html     # Contact form
├── nav.html        # Navigation template
└── footer.html    # Footer template

## Setup and Installation

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/hcdevjs/starkey.git
   cd starkey
````

````

2. **Dependencies:**

   - No npm/package installation required
   - Uses CDN-hosted libraries:
     - FullCalendar for event management
     - Custom CSS for dark theme

3. **Start the Local Server:**

   ```bash
   # Using Python (recommended)
   python3 -m http.server 8000

   # Or using PHP
   php -S localhost:8000
````

4. **View the Website:**
   Open your browser and go to `http://localhost:8000/docs/`

## Component System

### Navigation Bar

- Responsive navigation system
- Hamburger menu on mobile
- Dynamically loaded via `app.js`
- Edit in `nav.html`

### Footer

- Social media links
- Contact information
- Quick navigation links
- Edit in `footer.html`

### Hero Carousel

- Featured on the home page
- Automatic image rotation
- Mobile-responsive
- Add images to `assets/img/` and update references in `index.html`

### Music Integration

- Spotify track embeddings
- Responsive player
- Edit embed codes in `music.html`

## Calendar Management

The website includes an event calendar system that can be managed through a simple command-line interface.

### Managing Events

1. **Run the Event Management Script:**

   ```bash
   # Make the script executable (first time only)
   chmod +x docs/assets/js/manage-events.js

   # Run the management script from the root directory
   node docs/assets/js/manage-events.js
   ```

2. **Available Commands:**

   - Add new events: Select option 1 and follow the prompts
   - List all events: Select option 2 to view current events
   - Remove events: Select option 3 and select the event to remove
   - Exit: Select option 4 to quit the program

3. **Event Information Required:**
   - Event title
   - Date (YYYY-MM-DD format)
   - Start time (HH:MM format)
   - End time (HH:MM format)
   - Location
   - Ticket URL (optional)
   - Event description

### Event Storage

- Events are stored in `docs/assets/data/events.json`
- The calendar on `events.html` automatically loads events from this file
- The file is updated automatically when using the management script

### Technical Details

- The calendar uses FullCalendar library for display
- Events are loaded dynamically from the JSON file
- The calendar supports both month and list views
- Responsive design switches to list view on mobile devices

## Customization

### Styling

- Main styles in `assets/css/styles.css`
- Dark theme colors:
  ```css
  :root {
    --background: #121212;
    --surface: #1e1e1e;
    --primary: #bb86fc;
    --text: #e0e0e0;
  }
  ```
- Calendar styles in `assets/css/calendar.css`

### Content Updates

1. **Home Page:**

   - Update hero carousel images in `index.html`
   - Modify card content for shows, music, and news

2. **Music Page:**

   - Update Spotify embed codes in `music.html`
   - Add/remove tracks as needed

3. **About Page:**

   - Update artist biography in `about.html`
   - Replace artist image

4. **Contact Form:**
   - Customize form fields in `contact.html`
   - Add form processing (currently placeholder)

### Adding New Pages

1. Create new HTML file in `docs/`
2. Include common elements:
   ```html
   <div id="nav-placeholder"></div>
   <div id="footer-placeholder"></div>
   <script src="assets/js/app.js"></script>
   ```
3. Add link to navigation in `nav.html`

## Deployment

1. **Prepare for Production:**

   - Update all placeholder content
   - Replace placeholder images
   - Set up form processing
   - Update social media links

2. **Hosting Options:**

   - Static hosting (GitHub Pages, Netlify)
   - Traditional web hosting
   - AWS S3 or similar

3. **Domain Setup:**
   - Point domain to hosting
   - Update any absolute URLs
   - Configure SSL certificate

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support or feature requests:

1. Open an issue on GitHub
2. Contact via the form on the website
3. Email (add support email)
