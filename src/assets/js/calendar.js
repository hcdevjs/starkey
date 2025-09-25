document.addEventListener('DOMContentLoaded', function() {
  const calendarEl = document.getElementById('calendar');
  const modal = document.getElementById('eventModal');
  if (!calendarEl || !modal) return;

  // Close modal when clicking the close button
  const closeModal = document.querySelector('.close-modal');
  if (closeModal) {
    closeModal.addEventListener('click', () => {
      modal.style.display = 'none';
    });
  }

  // Close modal when clicking outside
  window.addEventListener('click', (event) => {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });

  const calendar = new FullCalendar.Calendar(calendarEl, {
    themeSystem: 'standard',
    initialView: window.innerWidth < 768 ? 'listMonth' : 'dayGridMonth',
    height: 'auto',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,listMonth'
    },
    events: function(fetchInfo, successCallback, failureCallback) {
      fetch('assets/data/events.json')
        .then(response => response.json())
        .then(data => {
          successCallback(data.events);
        })
        .catch(error => {
          console.error('Error loading events:', error);
          failureCallback(error);
        });
    },
    eventClick: function(info) {
      info.jsEvent.preventDefault();
      
      // Format date and time
      const startDate = info.event.start;
      const endDate = info.event.end;
      const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      const timeOptions = { hour: 'numeric', minute: '2-digit' };
      
      // Update modal content
      document.getElementById('modalTitle').textContent = info.event.title;
      document.getElementById('modalDate').textContent = startDate.toLocaleDateString(undefined, dateOptions);
      document.getElementById('modalTime').textContent = `${startDate.toLocaleTimeString(undefined, timeOptions)} - ${endDate.toLocaleTimeString(undefined, timeOptions)}`;
      document.getElementById('modalLocation').textContent = info.event.extendedProps.location || 'TBA';
      document.getElementById('modalDescription').textContent = info.event.extendedProps.description || '';
      
      // Handle venue and map links
      const venueLink = document.getElementById('modalVenueLink');
      const mapLink = document.getElementById('modalMapLink');
      
      if (info.event.extendedProps.venueUrl) {
        venueLink.style.display = 'inline-block';
        venueLink.href = info.event.extendedProps.venueUrl;
      } else {
        venueLink.style.display = 'none';
      }

      if (info.event.extendedProps.location) {
        mapLink.style.display = 'inline-block';
        mapLink.href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(info.event.extendedProps.location)}`;
      } else {
        mapLink.style.display = 'none';
      }

      // Show modal
      modal.style.display = 'block';
    },
    eventDidMount: function(info) {
      // Add location information to event elements
      if (info.event.extendedProps.location) {
        info.el.title = info.event.extendedProps.location;
      }
    }
  });

  calendar.render();

  // Handle responsive view changes
  window.addEventListener('resize', function() {
    calendar.setOption('initialView', 
      window.innerWidth < 768 ? 'listMonth' : 'dayGridMonth'
    );
  });
});