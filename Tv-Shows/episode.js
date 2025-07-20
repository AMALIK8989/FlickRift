$(document).ready(function () {
  try {
    const $iframe = $('#show-episode');
    const $epBtns = $('#ep-btns');

    if (!$iframe.length || !$epBtns.length) {
      console.warn('❌ Required DOM elements not found.');
      return;
    }

    // Load saved episode from localStorage
    const savedSrc = localStorage.getItem('selectedEpisodeSrc');
    if (savedSrc) {
      $iframe.attr('src', savedSrc).attr('loading', 'lazy');
    }

    // Event delegation (better if buttons are loaded dynamically)
    $epBtns.on('click', 'button', function () {
      try {
        const newSrc = $(this).data('src');
        if (!newSrc) throw new Error('No video source provided');

        const currentSrc = $iframe.attr('src');

        if (newSrc === currentSrc) {
          showToast('ℹ️ This episode is already playing');
          return;
        }

        // Store new source in localStorage
        localStorage.setItem('selectedEpisodeSrc', newSrc);

        // Optional: Add loading spinner here
        $iframe.addClass('opacity-50');

        // Graceful reload
        $iframe.attr('src', '');
        setTimeout(() => {
          $iframe.attr('src', newSrc);
          $iframe.removeClass('opacity-50');
          showToast('✅ Episode loaded successfully');
        }, 100);

      } catch (err) {
        console.error('🎬 Button click error:', err);
        showToast(`❌ Error: ${err.message}`, true);
      }
    });

    // Optional: Persist until manually cleared
    // If you still want auto-clear:
    // $(window).on('beforeunload', () => localStorage.removeItem('selectedEpisodeSrc'));

  } catch (err) {
    console.error('🔥 Script Init Error:', err);
    showToast(`❌ Init error: ${err.message}`, true);
  }

  // Toast Notification
  function showToast(message, isError = false) {
    const toastId = `toast-${Date.now()}`;
    const toastHtml = `
      <div id="${toastId}" class="toast align-items-center text-white ${isError ? 'bg-danger' : 'bg-success'} border-0 position-fixed bottom-0 end-0 m-4"
        role="alert" aria-live="${isError ? 'assertive' : 'polite'}" aria-atomic="true" style="z-index: 9999;">
        <div class="d-flex">
          <div class="toast-body">${message}</div>
          <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
      </div>
    `;

    $('body').append(toastHtml);
    const toast = new bootstrap.Toast(document.getElementById(toastId), { delay: 3000 });
    toast.show();

    setTimeout(() => {
      $(`#${toastId}`).remove();
    }, 3500);
  }
});
