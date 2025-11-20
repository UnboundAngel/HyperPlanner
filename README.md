# HyperPlanner Landing Page

A stunning, interactive landing page for HyperPlanner - your personal ops layer.

## Features

### 🎨 Design & Aesthetics
- **Glassy, Warm Aesthetic**: Frosted glass effects with subtle warmth
- **Dark Theme**: Optimized for reduced eye strain and modern appeal
- **Responsive Design**: Works beautifully on desktop, tablet, and mobile
- **Smooth Animations**: Subtle, performant animations throughout

### 🖱️ Interactive Elements
- **Custom Cursor Effects**: Glowing cursor trail that reacts to mouse movement
- **Background Reactions**: Gradient shifts based on cursor position
- **Hover Effects**: Cards tilt and glow on hover
- **Parallax Scrolling**: Smooth depth effects as you scroll

### 📱 Components

#### Navigation
- Fixed navigation bar with blur effect
- Smooth scroll to sections
- Mobile-responsive menu
- Sign-in button with modal

#### Hero Section
- Compelling headline with gradient text
- Feature badges
- Dual CTA buttons (Demo / Sign Up)
- Animated preview window

#### Features Section
- 6 Feature cards with detailed information
- Hover effects with tilt animation
- Icon-based visual hierarchy

#### How It Works
- 8 Deep-dive cards explaining every feature
- Code examples
- Visual automation examples
- Expandable content

#### Customization Showcase
- Theme preview cards
- Interactive previews
- Theme Lab CTA

#### Demo Section
- Clear explanation of demo vs. full features
- Visual feature comparison
- Honest about locked features

#### Footer
- Multi-column layout
- Link sections
- Brand information

#### Sign-In Modal
- Tab-based authentication (Sign In / Sign Up)
- Form validation
- Social provider buttons (Google, GitHub)
- Smooth animations

### ⚡ JavaScript Features

#### Cursor Effects
- Glowing cursor that follows the mouse
- Trailing cursor with smooth animation
- Changes size on interactive elements
- Automatically hidden on touch devices

#### Modal System
- Smooth open/close animations
- Click outside to close
- Escape key support
- Tab switching between sign-in/sign-up

#### Scroll Effects
- Navigation bar changes on scroll
- Parallax effects
- Fade-in animations for "How It Works" cards
- Smooth scrolling for anchor links

#### Demo Mode
- All demo buttons trigger notification
- Ready to connect to actual app

#### Easter Egg
- Konami code (↑↑↓↓←→←→BA) activates rainbow mode
- Console welcome message

#### Notifications
- Toast-style notifications
- Auto-dismiss after 3 seconds
- Success/info/error variants

## File Structure

```
HyperPlanner/
├── index.html          # Main HTML structure
├── styles.css          # All styling and animations
├── script.js           # Interactive JavaScript
└── README.md          # This file
```

## Usage

### Local Development

1. **Open the page**:
   - Simply open `index.html` in a modern web browser
   - Or use a local server:
     ```bash
     python -m http.server 8000
     # Then visit http://localhost:8000
     ```

2. **Test all features**:
   - Move your cursor around to see the glow effect
   - Click "Sign In" to open the modal
   - Click "Try Demo" buttons to see notifications
   - Scroll to see parallax effects
   - Try on mobile devices for responsive design

### Customization

#### Colors
Edit the CSS variables in `styles.css`:
```css
:root {
    --primary: #6366f1;
    --secondary: #ec4899;
    --accent: #f59e0b;
    /* ... more variables */
}
```

#### Content
Edit the HTML in `index.html`:
- Change headlines in `.hero-title`
- Update feature descriptions in `.feature-card`
- Modify footer links in `.footer`

#### Animations
Adjust timing in `styles.css`:
```css
--transition-fast: 150ms;
--transition-base: 250ms;
--transition-slow: 400ms;
```

## Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

### Required Features
- CSS Grid & Flexbox
- CSS Custom Properties
- Backdrop Filter
- Intersection Observer API
- ES6+ JavaScript

## Performance

- **Lightweight**: ~50KB total (HTML + CSS + JS)
- **Optimized animations**: Uses `transform` and `opacity` for 60fps
- **Lazy loading ready**: Infrastructure for image lazy loading
- **Reduced motion support**: Respects user preferences

## Accessibility

- Semantic HTML5 elements
- ARIA labels where needed
- Keyboard navigation support
- Reduced motion media query
- Color contrast compliance (WCAG AA)

## Interactive Features Checklist

- [x] Custom cursor glow effect
- [x] Cursor trail animation
- [x] Background gradient follows mouse
- [x] Smooth scroll navigation
- [x] Modal open/close animations
- [x] Form validation
- [x] Mobile menu toggle
- [x] Feature card hover effects (tilt)
- [x] Scroll-triggered animations
- [x] Parallax effects
- [x] Notification system
- [x] Demo mode buttons
- [x] Easter egg (Konami code)
- [x] Preview window animations
- [x] Theme preview interactions

## Demo Mode Locked Features

When users click "Try Demo", the following features are explained as locked:
- 🔒 AI suggestions & insights
- 🔒 Advanced automations (webhooks, complex rules)
- 🔒 Template marketplace & sharing
- 🔒 Multi-device sync & cloud backup

Everything else is fully available in demo mode!

## Future Enhancements

### Planned Features
- [ ] Video demonstration
- [ ] Interactive theme switcher (live preview)
- [ ] Customer testimonials section
- [ ] Pricing page integration
- [ ] Blog/documentation links
- [ ] Language switcher
- [ ] Dark/light mode toggle
- [ ] Cookie consent banner
- [ ] Analytics integration
- [ ] A/B testing framework

### Technical Improvements
- [ ] Service Worker for offline capability
- [ ] Progressive Web App (PWA) support
- [ ] WebP image format with fallbacks
- [ ] Bundle optimization & minification
- [ ] CDN integration
- [ ] SEO meta tags optimization
- [ ] Social media cards (Open Graph, Twitter)

## Integration Points

### Connect to Backend
When ready to connect to your actual HyperPlanner app:

1. **Demo Mode**: Update the demo button handlers in `script.js`:
   ```javascript
   window.location.href = '/app?mode=demo';
   ```

2. **Sign In/Sign Up**: Connect forms to your authentication API:
   ```javascript
   fetch('/api/auth/signup', {
       method: 'POST',
       body: JSON.stringify(formData)
   });
   ```

3. **Analytics**: Uncomment the analytics tracking in `script.js`

## Design Philosophy

HyperPlanner's landing page reflects the product's core values:

1. **Customization**: Every element can be tweaked
2. **Transparency**: Honest about demo limitations
3. **Performance**: Fast, smooth, responsive
4. **Aesthetics**: Glassy, warm, inviting
5. **User Control**: You decide how to interact

## Credits

- **Font**: Inter by Rasmus Andersson
- **Design Inspiration**: Glass morphism, modern SaaS
- **Color Palette**: Custom gradient blend

## License

Copyright © 2025 HyperPlanner. All rights reserved.

---

Built with ❤️ for thinkers, makers, and planners.