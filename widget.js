(function() {
  function createBookingWidget(options) {
    // Create the button
    const button = document.createElement('button');
    
    // Apply basic styles and default options
    const defaultStyles = {
      backgroundColor: options.color || '#008CBA',
      color: options.textColor || '#FFFFFF',
      fontSize: options.fontSize || '16px',
      padding: options.padding || '10px 20px',
      borderRadius: options.borderRadius || '5px',
      border: 'none',
      cursor: 'pointer',
      zIndex: '1000',
      display: 'flex',
      alignItems: 'center',
      gap: '10px'
    };
    
    Object.assign(button.style, defaultStyles);

    // Handle positioning
    if (options.position) {
      button.style.position = 'fixed';
      if (options.position.includes('top')) {
        button.style.top = '20px';
      }
      if (options.position.includes('bottom')) {
        button.style.bottom = '20px';
      }
      if (options.position.includes('left')) {
        button.style.left = '20px';
      }
      if (options.position.includes('right')) {
        button.style.right = '20px';
      }
    } else {
      button.style.position = 'relative';
    }

    // Handle alignment
    if (options.alignment) {
      if (options.alignment === 'center') {
        button.style.left = '50%';
        button.style.transform = 'translateX(-50%)';
      } else if (options.alignment === 'left') {
        button.style.left = '0';
      } else if (options.alignment === 'right') {
        button.style.right = '0';
      }
    }

    // Add icon if provided
    if (options.icon) {
      const icon = document.createElement('img');
      icon.src = options.icon;
      icon.alt = 'icon';
      icon.style.width = '20px';
      icon.style.height = '20px';

      if (options.iconPosition === 'right') {
        button.appendChild(document.createTextNode(options.text || 'Book Now'));
        button.appendChild(icon);
      } else {
        button.appendChild(icon);
        button.appendChild(document.createTextNode(options.text || 'Book Now'));
      }
    } else {
      button.textContent = options.text || 'Book Now';
    }

    // Create the popup container
    const popupContainer = document.createElement('div');
    popupContainer.style.display = 'none';
    popupContainer.style.position = 'fixed';
    popupContainer.style.top = '0';
    popupContainer.style.left = '0';
    popupContainer.style.width = '100%';
    popupContainer.style.height = '100%';
    popupContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    popupContainer.style.justifyContent = 'center';
    popupContainer.style.alignItems = 'center';
    popupContainer.style.zIndex = '1000';

    // Create the iframe container
    const iframeContainer = document.createElement('div');
    iframeContainer.style.position = 'relative';
    iframeContainer.style.backgroundColor = '#fff';
    iframeContainer.style.boxShadow = '0px 0px 15px rgba(0, 0, 0, 0.2)';
    iframeContainer.style.overflow = 'hidden';
    iframeContainer.style.width = '440px';
    iframeContainer.style.height = '650px';
    iframeContainer.style.border = 'none';
    iframeContainer.style.borderRadius = '8px';

    // Create the iframe
    const iframe = document.createElement('iframe');
    iframe.style.width = '440px';
    iframe.style.height = '650px';
    iframe.style.border = 'none';
    iframe.style.borderRadius = '8px';
    iframe.style.display = 'block';
    iframe.src = options.bookingUrl || 'https://qiv.repairy.au/repairy';

    // Create the loading overlay
    const loadingOverlay = document.createElement('div');
    loadingOverlay.style.position = 'absolute';
    loadingOverlay.style.top = '0';
    loadingOverlay.style.left = '0';
    loadingOverlay.style.width = '100%';
    loadingOverlay.style.height = '100%';
    loadingOverlay.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
    loadingOverlay.style.display = 'flex';
    loadingOverlay.style.justifyContent = 'center';
    loadingOverlay.style.alignItems = 'center';
    loadingOverlay.style.zIndex = '1000';

    // Create the loading spinner
    const spinner = document.createElement('div');
    spinner.style.border = '16px solid #f3f3f3';
    spinner.style.borderRadius = '50%';
    spinner.style.borderTop = '16px solid #3498db';
    spinner.style.width = '120px';
    spinner.style.height = '120px';
    spinner.style.animation = 'spin 2s linear infinite';
    loadingOverlay.appendChild(spinner);

    iframeContainer.appendChild(iframe);
    iframeContainer.appendChild(loadingOverlay);
    popupContainer.appendChild(iframeContainer);

    // Button click event
    button.addEventListener('click', () => {
      popupContainer.style.display = 'flex';
      iframe.src = options.bookingUrl || 'https://qiv.repairy.au/repairy';
      loadingOverlay.style.display = 'flex';
    });

    // Iframe load event
    iframe.addEventListener('load', () => {
      loadingOverlay.style.display = 'none';
    });

    // Popup container click event
    popupContainer.addEventListener('click', (event) => {
      if (event.target === popupContainer) {
        popupContainer.style.display = 'none';
        iframe.src = 'about:blank';
      }
    });

    // Apply custom styles from options
    if (options.styles) {
      Object.assign(button.style, options.styles);
    }

    // Append button and popup container to the body
    document.body.appendChild(button);
    document.body.appendChild(popupContainer);
  }

  // Function to initialize the widget with data attributes
  function initBookingWidgets() {
    const widgets = document.querySelectorAll('booking-widget');
    widgets.forEach(widget => {
      const options = {
        text: widget.getAttribute('text'),
        color: widget.getAttribute('color'),
        textColor: widget.getAttribute('text-color'),
        fontSize: widget.getAttribute('font-size'),
        padding: widget.getAttribute('padding'),
        borderRadius: widget.getAttribute('border-radius'),
        icon: widget.getAttribute('icon'),
        iconPosition: widget.getAttribute('icon-position') || 'left',
        bookingUrl: widget.getAttribute('booking-url'),
        position: widget.getAttribute('position'),
        alignment: widget.getAttribute('alignment'),
        styles: JSON.parse(widget.getAttribute('styles') || '{}')
      };
      createBookingWidget(options);
    });
  }

  // Initialize the widget once the DOM is fully loaded
  document.addEventListener('DOMContentLoaded', initBookingWidgets);

  // Add spinner animation CSS
  const style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;
  document.getElementsByTagName('head')[0].appendChild(style);
})();