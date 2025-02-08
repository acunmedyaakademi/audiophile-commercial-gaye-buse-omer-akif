document.addEventListener("DOMContentLoaded", function () {
  const navItems = document.querySelectorAll(".nav-item");
  const contentDiv = document.querySelector(".content"); // İçerik alanı

  // Sayfa içerikleri
  const pages = {
    home: `
          <h2>ABOUT ME</h2>
          <p>Hello there! I'm thrilled to welcome you to my portfolio. 
          I am a passionate and versatile full-stack developer with a keen interest 
          in exploring the latest cutting-edge technologies.</p>
          <p>My journey in the world of web development has been nothing short of exhilarating, 
          and I constantly strive to enhance my skills and embrace emerging trends in the industry.</p>
      `,
    resume: `
          <h2>Resume</h2>
          <p>Here is my professional experience and education background. 
          I have worked on numerous projects that highlight my expertise in full-stack development.</p>
      `,
    work: `
          <h2>My Work</h2>
          <p>Take a look at some of the projects I've worked on. 
          These include web applications, mobile apps, and UI/UX designs.</p>
      `,
    contact: `
          <h2>Contact Me</h2>
          <p>Feel free to reach out to me via email or social media. 
          I'm always open to new opportunities and collaborations.</p>
      `
  };

  // Sayfa açıldığında "Home" içeriğini yükle
  contentDiv.innerHTML = pages.home;

  // Navigasyon butonlarına tıklanınca içeriği değiştirme
  navItems.forEach(item => {
    item.addEventListener("click", function () {
      const page = this.dataset.page; // Tıklanan butonun veri sayfasını al

      if (pages[page]) {
        contentDiv.innerHTML = pages[page]; // İçeriği güncelle
      }

      // Aktif butonu güncelle
      navItems.forEach(nav => nav.classList.remove("active"));
      this.classList.add("active");
    });
  });
});
