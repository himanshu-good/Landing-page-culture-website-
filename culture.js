function myFunction(x) {
    x.classList.toggle("change");
  }
const main1 = document.querySelector('.main1');
const main2 = document.querySelector('.main2');
const scrollContainer = document.querySelector('.scroll-container');

// Flag to prevent simultaneous scroll events
let isScrolling = false;

// Function to synchronize scrolling
const syncScroll = (source, target1, target2, reverse1, reverse2) => {
    if (isScrolling) return;
    isScrolling = true;

    // Calculate the scroll values
    if (reverse1) {
        target1.scrollTop = target1.scrollHeight - target1.clientHeight - source.scrollTop;
    } else {
        target1.scrollTop = source.scrollTop;
    }

    if (reverse2) {
        target2.scrollLeft = source.scrollTop;
    } else {
        target2.scrollLeft = source.scrollHeight - source.scrollTop;
    }

    // Reset flag after the scroll finishes
    setTimeout(() => {
        isScrolling = false;
    }, 10);
};

// Scroll event for main1
main1.addEventListener('scroll', () => {
    syncScroll(main1, main2, scrollContainer, true, true); // main2 moves downward, scroll-container moves right to left
});

// Scroll event for main2
main2.addEventListener('scroll', () => {
    syncScroll(main2, main1, scrollContainer, true, false); // main1 moves downward, scroll-container moves left to right
});

// Scroll event for scroll-container
scrollContainer.addEventListener('scroll', () => {
    if (isScrolling) return;
    isScrolling = true;

    // Sync main1 and main2 with scroll-container
    main1.scrollTop = scrollContainer.scrollLeft;
    main2.scrollTop = main2.scrollHeight - main2.clientHeight - scrollContainer.scrollLeft;

    // Reset flag after scroll finishes
    setTimeout(() => {
        isScrolling = false;
    }, 10);
});

