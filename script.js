// =========================================================
// KORECOME COMPREHENSIVE COLLEGE
// GLOBAL WEBSITE JAVASCRIPT
// =========================================================

document.addEventListener("DOMContentLoaded", () => {
  /* =====================================================
       MOBILE NAVIGATION
    ===================================================== */

  const menuToggle = document.querySelector(".menu-toggle");
  const mainNav = document.querySelector(".main-nav");

  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => {
      mainNav.classList.toggle("mobile-active");

      const icon = menuToggle.querySelector("i");

      if (mainNav.classList.contains("mobile-active")) {
        icon.classList.remove("fa-bars");
        icon.classList.add("fa-xmark");
      } else {
        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");
      }
      const contactForm = document.querySelector(".contact-form");

      if (contactForm) {
        contactForm.addEventListener("submit", (event) => {
          event.preventDefault();

          const requiredFields = contactForm.querySelectorAll("[required]");

          let valid = true;

          requiredFields.forEach((field) => {
            if (field.type === "checkbox" && !field.checked) {
              valid = false;
              field.classList.add("form-error");
            } else if (field.type !== "checkbox" && !field.value.trim()) {
              valid = false;
              field.classList.add("form-error");
            } else {
              field.classList.remove("form-error");
            }
          });

          if (!valid) {
            showFormMessage(
              contactForm,
              "Please complete all required fields before sending your enquiry.",
              "error",
            );

            return;
          }

          showFormMessage(
            contactForm,
            "Your enquiry has been prepared successfully. Connect this form to the school's email or backend service before launch.",
            "success",
          );
        });

        contactForm
          .querySelectorAll("input, select, textarea")
          .forEach((field) => {
            field.addEventListener("input", () => {
              field.classList.remove("form-error");
            });

            field.addEventListener("change", () => {
              field.classList.remove("form-error");
            });
          });
      }
    });

    // Close menu when a navigation link is clicked

    mainNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mainNav.classList.remove("mobile-active");

        const icon = menuToggle.querySelector("i");

        if (icon) {
          icon.classList.remove("fa-xmark");
          icon.classList.add("fa-bars");
        }
      });
    });
  }

  /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  document.querySelectorAll(".main-nav a").forEach((link) => {
    const href = link.getAttribute("href");

    if (!href || href.startsWith("#")) {
      return;
    }

    const linkPage = href.split("#")[0];

    if (
      linkPage === currentPage ||
      (currentPage === "" && linkPage === "index.html")
    ) {
      link.classList.add("active");
    }
  });

  /* =====================================================
       SMOOTH SCROLL
    ===================================================== */

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (event) {
      const targetId = this.getAttribute("href");

      if (!targetId || targetId === "#" || targetId.length < 2) {
        return;
      }

      const target = document.querySelector(targetId);

      if (!target) {
        return;
      }

      event.preventDefault();

      const header = document.querySelector(".site-header");

      const headerHeight = header ? header.offsetHeight : 0;

      const targetPosition =
        target.getBoundingClientRect().top + window.scrollY - headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    });
  });

  /* =====================================================
       SCROLL REVEAL
    ===================================================== */

  const revealElements = document.querySelectorAll(
    ".process-card, " +
    ".life-category-card, " +
    ".gallery-item, " +
    ".facility-item, " +
    ".academic-card, " +
    ".value-card, " +
    ".learning-pillar, " +
    ".requirements-list li, " +
    ".impact-card, " +
    ".leadership-image, " +
    ".leadership-content"
);
  );

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-visible");

            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
      },
    );

    revealElements.forEach((element) => {
      element.classList.add("reveal-element");

      revealObserver.observe(element);
    });
  }

  /* =====================================================
       GALLERY LIGHTBOX
    ===================================================== */

  const galleryItems = document.querySelectorAll(".gallery-item");

  if (galleryItems.length > 0) {
    createLightbox();

    galleryItems.forEach((item) => {
      item.addEventListener("click", () => {
        const image = item.querySelector("img");

        if (!image) {
          return;
        }

        const lightbox = document.querySelector(".gallery-lightbox");

        const lightboxImage = lightbox.querySelector(".lightbox-image");

        const lightboxCaption = lightbox.querySelector(".lightbox-caption");

        lightboxImage.src = image.src;
        lightboxImage.alt = image.alt;

        lightboxCaption.textContent = image.alt || "Korecome School Life";

        lightbox.classList.add("active");

        document.body.classList.add("lightbox-open");
      });
    });
  }

  /* =====================================================
       APPLICATION FORM
    ===================================================== */

  const applicationForm = document.querySelector(".application-form");

  if (applicationForm) {
    applicationForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const requiredFields = applicationForm.querySelectorAll("[required]");

      let valid = true;

      requiredFields.forEach((field) => {
        if (field.type === "checkbox" && !field.checked) {
          valid = false;
          field.classList.add("form-error");
        } else if (field.type !== "checkbox" && !field.value.trim()) {
          valid = false;
          field.classList.add("form-error");
        } else {
          field.classList.remove("form-error");
        }
      });

      if (!valid) {
        showFormMessage(
          applicationForm,
          "Please complete all required fields before submitting.",
          "error",
        );

        return;
      }

      showFormMessage(
        applicationForm,
        "Your application has been prepared successfully. Connect this form to the school's backend or email service to receive submissions.",
        "success",
      );
    });

    applicationForm
      .querySelectorAll("input, select, textarea")
      .forEach((field) => {
        field.addEventListener("input", () => {
          field.classList.remove("form-error");
        });
      });
  }

  /* =====================================================
       BACK TO TOP
    ===================================================== */

  const backToTop = document.createElement("button");

  backToTop.className = "back-to-top";

  backToTop.setAttribute("aria-label", "Back to top");

  backToTop.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';

  document.body.appendChild(backToTop);

  window.addEventListener("scroll", () => {
    if (window.scrollY > 500) {
      backToTop.classList.add("visible");
    } else {
      backToTop.classList.remove("visible");
    }
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
});

/* =========================================================
   CREATE GALLERY LIGHTBOX
========================================================= */

function createLightbox() {
  if (document.querySelector(".gallery-lightbox")) {
    return;
  }

  const lightbox = document.createElement("div");

  lightbox.className = "gallery-lightbox";

  lightbox.innerHTML = `

        <button
            class="lightbox-close"
            aria-label="Close gallery">

            <i class="fa-solid fa-xmark"></i>

        </button>

        <div class="lightbox-content">

            <img
                class="lightbox-image"
                src=""
                alt="">

            <p class="lightbox-caption"></p>

        </div>

    `;

  document.body.appendChild(lightbox);

  const closeButton = lightbox.querySelector(".lightbox-close");

  closeButton.addEventListener("click", closeLightbox);

  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && lightbox.classList.contains("active")) {
      closeLightbox();
    }
  });
}

/* =========================================================
   CLOSE LIGHTBOX
========================================================= */

function closeLightbox() {
  const lightbox = document.querySelector(".gallery-lightbox");

  if (!lightbox) {
    return;
  }

  lightbox.classList.remove("active");

  document.body.classList.remove("lightbox-open");
}

/* =========================================================
   FORM MESSAGE
========================================================= */

function showFormMessage(form, message, type) {
  let messageBox = form.querySelector(".form-message");

  if (!messageBox) {
    messageBox = document.createElement("div");

    messageBox.className = "form-message";

    form.prepend(messageBox);
  }

  messageBox.textContent = message;

  messageBox.className = `form-message ${type}`;

  messageBox.scrollIntoView({
    behavior: "smooth",
    block: "center",
  });
}
