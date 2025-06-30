const products = [
  {
    name: "Laptop Gaming (1)",
    price: 32000000,
    image: "laptop-gaming1.jpg",
    category: "gaming",
  },
  {
    name: "Laptop Gaming (2)",
    price: 29500000,
    image: "laptop-gaming2.jpg",
    category: "gaming",
  },
  {
    name: "Laptop Gaming (3)",
    price: 28000000,
    image: "laptop-gaming3.jpg",
    category: "gaming",
  },
  {
    name: "Laptop Gaming (4)",
    price: 31000000,
    image: "laptop-gaming4.jpg",
    category: "gaming",
  },
  {
    name: "Laptop Office (1)",
    price: 12500000,
    image: "laptop-office1.jpg",
    category: "office",
  },
  {
    name: "Laptop Office (2)",
    price: 11200000,
    image: "laptop-office2.jpg",
    category: "office",
  },
  {
    name: "Laptop Office (3)",
    price: 10800000,
    image: "laptop-office3.jpg",
    category: "office",
  },
  {
    name: "Laptop Standar (1)",
    price: 8500000,
    image: "laptop-standar1.jpg",
    category: "standar",
  },
  {
    name: "Laptop Standar (2)",
    price: 7900000,
    image: "laptop-standar2.jpg",
    category: "standar",
  },
  {
    name: "Laptop Standar (3)",
    price: 8200000,
    image: "laptop-standar3.jpg",
    category: "standar",
  },
  {
    name: "Laptop Standar (4)",
    price: 7800000,
    image: "laptop-standar4.jpg",
    category: "standar",
  },
];
const daftarProduct = document.getElementById("produk-box-item");
const pilihKategori = document.getElementById("kategori");
const navbar = document.querySelector(".navbar-nav");
const hamburgerMenu = document.getElementById("menu");
const sCart = document.getElementById("shopping_cart");
const pUser = document.getElementById("pUser");
const cart = document.querySelector(".navbar-cart");
const productsUsers = [];
let hargaTotal = 0;

// * Function ambil data di localStorage
function getData() {
  let data = localStorage.getItem("produkUser") || [];
  return JSON.parse(data);
}

// * Function Tambah Product Ke Keranjang
function tambahProduct(index) {
  let objProduct = {
    name: products[index].name,
    price: products[index].price,
    image: products[index].image,
  };

  productsUsers.push(objProduct);

  // Set LocalStorage
  localStorage.setItem("produkUser", JSON.stringify(productsUsers));

  alert("Produk berhasil di tambahkan ke keranjang");

  tampilProductKeranjang();
}

// * Tampil Product di Keranjang
function tampilProductKeranjang() {
  pUser.innerHTML = "";
  let produk = getData();
  hargaTotal = 0;

  produk.forEach((element, index) => {
    let item = document.createElement("div");
    item.classList.add("pUserItem");
    item.innerHTML = `
    <img src="assets/img/produk/${element.image}" loading="lazy">
    <div class="item-content">
    <p>${element.name}</p>
    <p>Rp. ${element.price.toLocaleString("id-ID")}</p>
    <button type="button" onclick="hapusProduct(${index})">Hapus</button>
    </div>
    `;
    hargaTotal += element.price;
    pUser.appendChild(item);
  });

  const total = document.getElementById("total");
  total.textContent = hargaTotal.toLocaleString("id-ID");
}

// * Function hapus product
function hapusProduct(index) {
  let confirmasi = confirm("Apakah yakin ingin menghapusnya ? ");
  if (!confirmasi) {
    return;
  }
  productsUsers.splice(index, 1);
  // Set localStorage
  localStorage.setItem("produkUser", JSON.stringify(productsUsers));
  tampilProductKeranjang();
}

// * Function Tampil Product
function tampilProduct(kategori = "") {
  daftarProduct.innerHTML = "";

  const filteredProducts = kategori ? products.filter((p) => p.category === kategori) : products;

  filteredProducts.forEach((element) => {
    let item = document.createElement("div");
    item.classList.add("item");

    item.innerHTML = `
    <img src="assets/img/produk/${element.image}" class="item-img" loading="lazy">
    <div class="item-content">
    <p>${element.name}</p>
    <p>Rp. ${element.price.toLocaleString("id-ID")}</p>
    <button type="button" onclick="tambahProduct(${products.indexOf(element)})">Add To Cart</button>
    </div>
    `;

    daftarProduct.appendChild(item);
  });
}

// * Cart
sCart.addEventListener("click", () => {
  cart.classList.toggle("active");
});

// * Navbar Toogle
hamburgerMenu.addEventListener("click", () => {
  navbar.classList.toggle("active");
});
document.addEventListener("click", (e) => {
  if (!hamburgerMenu.contains(e.target) && !navbar.contains(e.target)) {
    navbar.classList.remove("active");
  }
});

// * Pilih Kategori
pilihKategori.addEventListener("input", () => {
  let kategori = pilihKategori.value;
  tampilProduct(kategori);
});

// * Form Kontak dan Form Bayar
document.getElementById("formBayar").addEventListener("submit", (e) => {
  alert("Maaf untuk form bayar masih belum bisa digunakan");
  e.preventDefault();
  e.target.reset();
});

document.getElementById("formKontak").addEventListener("submit", (e) => {
  alert("Maaf untuk form kontak masih belum bisa digunakan");
  e.preventDefault();
  e.target.reset();
});

// IIFE
(function () {
  tampilProduct();
  tampilProductKeranjang();
})();
