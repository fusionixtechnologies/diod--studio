/* ================================================
   DIOD STUDIO — script.js
   Stable Performance Version
================================================ */


/* ================================================
   CUSTOM CURSOR
================================================ */

const cursorDot = document.querySelector('.cursor-dot');
const cursorRing = document.querySelector('.cursor-ring');

if (
    cursorDot &&
    cursorRing &&
    window.matchMedia('(pointer: fine)').matches
) {

    let mouseX = 0;
    let mouseY = 0;

    let ringX = 0;
    let ringY = 0;

    const lerp = (a, b, t) =>
        a + (b - a) * t;


    document.addEventListener(
        'mousemove',
        (e) => {

            mouseX = e.clientX;
            mouseY = e.clientY;

            cursorDot.style.transform =
                `translate3d(${mouseX}px, ${mouseY}px, 0)
                 translate(-50%, -50%)`;

        },
        { passive: true }
    );


    function animateCursor() {

        ringX =
            lerp(
                ringX,
                mouseX,
                0.13
            );

        ringY =
            lerp(
                ringY,
                mouseY,
                0.13
            );

        cursorRing.style.transform =
            `translate3d(${ringX}px, ${ringY}px, 0)
             translate(-50%, -50%)`;

        requestAnimationFrame(
            animateCursor
        );
    }

    animateCursor();


    document.querySelectorAll(
        'a, button, .pre-card, .birthday-card, .reel-card, .pov-card, .service-item'
    ).forEach((el) => {

        el.addEventListener(
            'mouseenter',
            () => {
                cursorRing.classList.add('hovering');
            }
        );

        el.addEventListener(
            'mouseleave',
            () => {
                cursorRing.classList.remove('hovering');
            }
        );

    });

}


/* ================================================
   STICKY NAV
================================================ */

const nav =
    document.querySelector('nav');

const heroSection =
    document.querySelector('.hero');

if (
    nav &&
    heroSection
) {

    const navObserver =
        new IntersectionObserver(
            ([entry]) => {

                nav.classList.toggle(
                    'scrolled',
                    !entry.isIntersecting
                );

            },
            {
                threshold: 0,
                rootMargin:
                    '-80px 0px 0px 0px'
            }
        );

    navObserver.observe(
        heroSection
    );
}


/* ================================================
   MOBILE MENU
================================================ */

const toggle =
    document.querySelector('.nav-toggle');

const mobileMenu =
    document.querySelector('.mobile-menu');

if (
    toggle &&
    mobileMenu
) {

    function openMenu() {

        toggle.classList.add('open');

        mobileMenu.classList.add('open');

        toggle.setAttribute(
            'aria-expanded',
            'true'
        );

        document.body.style.overflow =
            'hidden';
    }


    function closeMenu() {

        toggle.classList.remove('open');

        mobileMenu.classList.remove('open');

        toggle.setAttribute(
            'aria-expanded',
            'false'
        );

        document.body.style.overflow =
            '';
    }


    toggle.addEventListener(
        'click',
        () => {

            if (
                mobileMenu.classList.contains('open')
            ) {

                closeMenu();

            }

            else {

                openMenu();

            }

        }
    );


    mobileMenu
        .querySelectorAll('a')
        .forEach((a) => {

            a.addEventListener(
                'click',
                closeMenu
            );

        });


    document.addEventListener(
        'keydown',
        (e) => {

            if (
                e.key === 'Escape'
            ) {
                closeMenu();
            }

        }
    );

}


/* ================================================
   REVEAL ANIMATIONS
================================================ */

const revealEls =
    document.querySelectorAll(
        '.reveal, .reveal-stagger, .reveal-clip, .reveal-fade'
    );

const revealObserver =
    new IntersectionObserver(
        (entries) => {

            entries.forEach(
                (entry) => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target
                            .classList
                            .add('active');

                        revealObserver
                            .unobserve(
                                entry.target
                            );

                    }

                }
            );

        },
        {
            threshold: 0.08,
            rootMargin:
                '0px 0px -60px 0px'
        }
    );

revealEls.forEach(
    (el) => {

        revealObserver.observe(
            el
        );

    }
);


/* ================================================
   IMAGE SHIMMER
================================================ */

document
    .querySelectorAll('.pre-card img')
    .forEach((img) => {

        const card =
            img.closest('.pre-card');

        if (!card) return;


        if (
            img.complete &&
            img.naturalWidth > 0
        ) {

            card.classList.add(
                'loaded'
            );

        }

        else {

            img.addEventListener(
                'load',
                () => {

                    card.classList.add(
                        'loaded'
                    );

                },
                { once: true }
            );

        }

    });


/* ================================================
   COUNT-UP NUMBERS
================================================ */

function countUp(el) {

    const target =
        parseFloat(
            el.dataset.target ||
            el.textContent
        ) || 0;

    const suffix =
        el.dataset.suffix || '';

    const duration =
        1600;

    const start =
        performance.now();


    function update(now) {

        const elapsed =
            now - start;

        const progress =
            Math.min(
                elapsed / duration,
                1
            );

        const eased =
            1 -
            Math.pow(
                1 - progress,
                4
            );

        const value =
            Math.round(
                eased * target
            );

        el.textContent =
            value.toLocaleString() +
            suffix;


        if (
            progress < 1
        ) {

            requestAnimationFrame(
                update
            );

        }

    }

    requestAnimationFrame(
        update
    );
}


const statNums =
    document.querySelectorAll('.count-up');

const statObserver =
    new IntersectionObserver(
        (entries) => {

            entries.forEach(
                (entry) => {

                    if (
                        entry.isIntersecting
                    ) {

                        countUp(
                            entry.target
                        );

                        statObserver
                            .unobserve(
                                entry.target
                            );

                    }

                }
            );

        },
        {
            threshold: 0.5
        }
    );

statNums.forEach(
    (el) => {

        statObserver.observe(
            el
        );

    }
);


/* ================================================
   MARQUEE HOVER
================================================ */

const marqueeTrack =
    document.querySelector('.marquee-track');

if (marqueeTrack) {

    const marqueeParent =
        marqueeTrack.parentElement;

    marqueeParent.addEventListener(
        'mouseenter',
        () => {

            marqueeTrack.style.animationPlayState =
                'paused';

        }
    );

    marqueeParent.addEventListener(
        'mouseleave',
        () => {

            marqueeTrack.style.animationPlayState =
                'running';

        }
    );

}


/* ================================================
   TRUE LAZY VIDEO LOADING
================================================ */

const lazyVideos =
    document.querySelectorAll('.lazy-video');

const videoObserver =
    new IntersectionObserver(
        (entries) => {

            entries.forEach(
                (entry) => {

                    const video =
                        entry.target;


                    if (
                        entry.isIntersecting
                    ) {

                        if (
                            !video.dataset.loaded &&
                            video.dataset.src
                        ) {

                            video.src =
                                video.dataset.src;

                            video.dataset.loaded =
                                'true';

                            video.load();

                        }


                        const playPromise =
                            video.play();


                        if (
                            playPromise !== undefined
                        ) {

                            playPromise.catch(
                                () => {}
                            );

                        }

                    }

                    else {

                        if (
                            !video.paused
                        ) {

                            video.pause();

                        }

                    }

                }
            );

        },
        {
            rootMargin:
                '120px 0px',

            threshold:
                0.05
        }
    );

lazyVideos.forEach(
    (video) => {

        videoObserver.observe(
            video
        );

    }
);


/* ================================================
   PAUSE VIDEOS WHEN TAB IS HIDDEN
================================================ */

document.addEventListener(
    'visibilitychange',
    () => {

        if (
            document.hidden
        ) {

            lazyVideos.forEach(
                (video) => {

                    if (
                        !video.paused
                    ) {

                        video.pause();

                    }

                }
            );

        }

    }
);