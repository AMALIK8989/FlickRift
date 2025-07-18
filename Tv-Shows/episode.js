$(document).ready(function () {
  try {
    // Handle episode button click
    $('#ep-btns button').on('click', function () {
      try {
        const newSrc = $(this).data('src');

        if (!newSrc) throw new Error("Invalid video source");

        // Store in localStorage
        localStorage.setItem('selectedEpisodeSrc', newSrc);

        const $iframe = $('#show-episode');

        // Clear current src
        $iframe.attr('src', '');

        // Lazy load with delay
        setTimeout(() => {
          $iframe.attr('src', newSrc);
          showToast('✅ Episode loaded successfully');
        }, 100);
      } catch (err) {
        showToast(`❌ Error loading episode: ${err.message}`, true);
      }
    });

    // Load saved src from localStorage on page load
    const savedSrc = localStorage.getItem('selectedEpisodeSrc');
    if (savedSrc) {
      $('#show-episode')
        .attr('src', savedSrc)
        .attr('loading', 'lazy'); // Enable lazy loading
    }

    // Clear localStorage on exit
    $(window).on('beforeunload', function () {
      localStorage.removeItem('selectedEpisodeSrc');
    });

  } catch (err) {
    showToast(`❌ Critical error: ${err.message}`, true);
  }

  // Toast function
  function showToast(message, isError = false) {
    const toastId = `toast-${Date.now()}`;
    const toastHtml = `
      <div id="${toastId}" class="toast align-items-center text-white ${isError ? 'bg-danger' : 'bg-success'} border-0 position-fixed bottom-0 end-0 m-4" role="alert" aria-live="assertive" aria-atomic="true" style="z-index: 9999;">
        <div class="d-flex">
          <div class="toast-body">${message}</div>
          <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
      </div>
    `;
    $('body').append(toastHtml);

    const toastEl = new bootstrap.Toast(document.getElementById(toastId), {
      delay: 3000
    });

    toastEl.show();

    // Optional: auto-remove toast DOM after hiding
    setTimeout(() => {
      $(`#${toastId}`).remove();
    }, 3500);
  }
});
