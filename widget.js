(function() {
    function createBookingWidget(options) {
      // Create the button
      const button = document.createElement('button');
      button.style.backgroundColor = options.color || '#008CBA';
      button.style.color = options.textColor || '#FFFFFF';
      button.style.fontSize = options.fontSize || '16px';
      button.style.padding = options.padding || '10px 20px';
      button.style.borderRadius = options.borderRadius || '5px';
      button.style.border = 'none';
      button.style.cursor = 'pointer';
      button.style.position = 'fixed';
      button.style.top = '50%';
      button.style.left = '50%';
      button.style.transform = 'translate(-50%, -50%)';
      button.style.zIndex = '1000';
      button.style.display = 'flex';
      button.style.alignItems = 'center';
      button.style.gap = '10px';
  
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
  
      // Create the iframe
      const iframe = document.createElement('iframe');
      iframe.style.width = '440px';
      iframe.style.height = '650px';
      iframe.style.border = 'none';
      iframe.style.borderRadius = '8px';
  
      popupContainer.appendChild(iframe);
  
      // Button click event
      button.addEventListener('click', () => {
        iframe.src = options.bookingUrl || 'https://qiv.repairy.au/repairy';
        popupContainer.style.display = 'flex';
      });
  
      // Popup container click event
      popupContainer.addEventListener('click', (event) => {
        if (event.target === popupContainer) {
          popupContainer.style.display = 'none';
          iframe.src = 'about:blank';
        }
      });
  
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
          bookingUrl: widget.getAttribute('booking-url')
        };
        createBookingWidget(options);
      });
    }
  
    // Initialize the widget once the DOM is fully loaded
    document.addEventListener('DOMContentLoaded', initBookingWidgets);
  })();
  