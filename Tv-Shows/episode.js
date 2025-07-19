$(document).ready(function () {
  try {
    $('#ep-btns button').on('click', function (e) {
      try {
        console.log('Episode button clicked:', e);

        const newSrc = $(this).data('src');
        if (!newSrc) throw new Error("Invalid video source");

        localStorage.setItem('selectedEpisodeSrc', newSrc);

        const $iframe = $('#show-episode');
        $iframe.attr('src', '');

        setTimeout(() => {
          $iframe.attr('src', newSrc);
          showToast('✅ Episode loaded successfully');
        }, 100);
      } catch (err) {
        console.error('Error in button click handler:', err);
        showToast(`❌ Error loading episode: ${err.message}`, true);
      }
    });

    const savedSrc = localStorage.getItem('selectedEpisodeSrc');
    if (savedSrc) {
      $('#show-episode')
        .attr('src', savedSrc)
        .attr('loading', 'lazy');
    }

    $(window).on('beforeunload', function () {
      localStorage.removeItem('selectedEpisodeSrc');
    });

  } catch (err) {
    console.error('Critical setup error:', err);
    showToast(`❌ Critical error: ${err.message}`, true);
  }

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

    setTimeout(() => {
      $(`#${toastId}`).remove();
    }, 3500);
  }
});
