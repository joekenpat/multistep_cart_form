const buildTypes = ["EMR", "RMR", "EME"];
const colourCodes = [
  "#6b7176",
  "#fff5c7",
  "#005f53",
  "#253849",
  "#b9b3af",
  "#b0392c",
  "#575e65",
  "#746866",
  "#7c3c3c",
  "#33393c",
  "#2c2d31",
  "#8bac9e",
  "#e7ceba",
  "#e7e8eb",
  "#f8fdff",
  "#e58f5e",
  "#5a2f2e",
  "#898d98",
  "#698980",
  "#88a0a6",
  "#545b54",
];

const buildTypeMap = {
  EMR: [
    { name: "edge", number: 1 },
    { name: "mesh", number: 1 },
    { name: "roof", number: 1 },
  ],
  RMR: [
    { name: "roof", number: 1 },
    { name: "mesh", number: 1 },
    { name: "roof", number: 2 },
  ],
  EME: [
    { name: "edge", number: 1 },
    { name: "mesh", number: 1 },
    { name: "edge", number: 2 },
  ],
};

let selectedBuildType = "";

let selectedEdge1ProductData = (selectedEdge2ProductData = selectedMeshProductData = selectedRoof1ProductData = selectedRoof2ProductData = {
  dataId: "",
  productId: "",
  productColor: "",
});

selectedRoof1ProductData.configItemId = "";
selectedRoof2ProductData.configItemId = "";

let selectedDataQuantity = {
  X5: 0,
  X10: 0,
  X15: 0,
  X30: 0,
};

const edgeData = [
  {
    id: 1,
    name: "Trim",
    image: "./assets/port.jpg",
    products: [
      {
        id: 1,
        name: "Trim material one",
        colors: [...colourCodes],
        price: {
          "5CM": 2,
          "10CM": 12,
          "15CM": 17,
          "30CM": 27,
        },
      },
      {
        id: 2,
        name: "Trim material two",
        colors: [...colourCodes],
        price: {
          "5CM": 3,
          "10CM": 4,
          "15CM": 5,
          "30CM": 15,
        },
      },
    ],
  },
  {
    id: 2,
    name: "Roof Sheet",
    image: "./assets/land.jpg",
    products: [
      {
        id: 1,
        name: "Roof material one",
        colors: [...colourCodes],
        price: {
          "5CM": 2,
          "10CM": 12,
          "15CM": 17,
          "30CM": 27,
        },
      },
      {
        id: 2,
        name: "Roof material two",
        colors: [...colourCodes],
        price: {
          "5CM": 3,
          "10CM": 4,
          "15CM": 5,
          "30CM": 15,
        },
      },
    ],
  },
  {
    id: 3,
    name: "Ceil Pan",
    image: "./assets/port.jpg",
    products: [
      {
        id: 1,
        name: "material one",
        colors: [...colourCodes],
        price: {
          "5CM": 2,
          "10CM": 12,
          "15CM": 17,
          "30CM": 27,
        },
      },
      {
        id: 2,
        name: "material two",
        colors: [...colourCodes],
        price: {
          "5CM": 3,
          "10CM": 4,
          "15CM": 5,
          "30CM": 15,
        },
      },
    ],
  },
];

const meshData = [
  {
    id: 1,
    name: "Fine Mesh",
    image: "./assets/port.jpg",
    products: [
      {
        id: 1,
        name: "old width one",
        colors: [...colourCodes],
        price: {
          "5CM": 2,
          "10CM": 12,
          "15CM": 17,
          "30CM": 27,
        },
      },
      {
        id: 2,
        name: "new width two",
        colors: [...colourCodes],
        price: {
          "5CM": 3,
          "10CM": 4,
          "15CM": 5,
          "30CM": 15,
        },
      },
    ],
  },
  {
    id: 2,
    name: "hard mesh",
    image: "./assets/land.jpg",
    products: [
      {
        id: 1,
        name: "width four",
        colors: [...colourCodes],
        price: {
          "5CM": 2,
          "10CM": 12,
          "15CM": 17,
          "30CM": 27,
        },
      },
      {
        id: 2,
        name: "width three",
        colors: [...colourCodes],
        price: {
          "5CM": 3,
          "10CM": 4,
          "15CM": 5,
          "30CM": 15,
        },
      },
    ],
  },
  {
    id: 3,
    name: "Ceil Mesh",
    image: "./assets/port.jpg",
    products: [
      {
        id: 1,
        name: "width one",
        colors: [...colourCodes],
        price: {
          "5CM": 2,
          "10CM": 12,
          "15CM": 17,
          "30CM": 27,
        },
      },
      {
        id: 2,
        name: "width two",
        colors: [...colourCodes],
        price: {
          "5CM": 3,
          "10CM": 4,
          "15CM": 5,
          "30CM": 15,
        },
      },
    ],
  },
];

const roofData = [
  {
    id: 1,
    name: "Corro",
    image: "./assets/port.jpg",
    config: {
      name: "corro config",
      items: [
        {
          id: 1,
          name: "coro config item 1",
        },
        {
          id: 2,
          name: "coro config item 2",
        },
      ],
    },
    products: [
      {
        id: 1,
        name: "corro roof material one",
        colors: [...colourCodes],
        price: {
          "5CM": 2,
          "10CM": 12,
          "15CM": 17,
          "30CM": 27,
        },
      },
      {
        id: 2,
        name: "corro roof material two",
        colors: [...colourCodes],
        price: {
          "5CM": 3,
          "10CM": 4,
          "15CM": 5,
          "30CM": 15,
        },
      },
    ],
  },
  {
    id: 2,
    name: "Roof Sheet",
    image: "./assets/land.jpg",
    config: {
      name: "Sheet config",
      items: [
        {
          id: 1,
          name: "sheet config item 1",
        },
        {
          id: 2,
          name: "sheet config item 2",
        },
      ],
    },
    products: [
      {
        id: 1,
        name: "sheet material one",
        colors: [...colourCodes],
        price: {
          "5CM": 2,
          "10CM": 12,
          "15CM": 17,
          "30CM": 27,
        },
      },
      {
        id: 2,
        name: "sheet material two",
        colors: [...colourCodes],
        price: {
          "5CM": 3,
          "10CM": 4,
          "15CM": 5,
          "30CM": 15,
        },
      },
    ],
  },
  {
    id: 3,
    name: "Ceil Pan",
    image: "./assets/port.jpg",
    config: {
      name: "Pan config",
      items: [
        {
          id: 1,
          name: "pan config item 1",
        },
        {
          id: 2,
          name: "pan config item 2",
        },
      ],
    },
    products: [
      {
        id: 1,
        name: "pan material one",
        colors: [...colourCodes],
        price: {
          "5CM": 2,
          "10CM": 12,
          "15CM": 17,
          "30CM": 27,
        },
      },
      {
        id: 2,
        name: "pan material two",
        colors: [...colourCodes],
        price: {
          "5CM": 3,
          "10CM": 4,
          "15CM": 5,
          "30CM": 15,
        },
      },
    ],
  },
];

const layoutTypeContent = buildTypes.map((x) => {
  return `<div class="col-4 p-1">
  <div class="card my-card" data-layout-id="${x}">
    <div class="card-body text-center">
      <p class="build-type-txt mb-0">${x}</p>
    </div>
  </div>
</div>`;
});

const edgeProductList = edgeData.map(({ id, image, name }) => {
  return `<div class="col-xl-2 col-lg-3 col-md-3 col-3 p-1">
  <div class="card  my-card" data-edge-category-id="${id}">
    <div class="card-body p-0 text-center">
      <img
        class="card-img-top my-image-style"
        src="${image}"
      />
    </div>
    <div
      class="card-footer text-center p-0 my-footer-txt text-bold"
    >${name}</div>
  </div>
</div>`;
});

const meshProductList = meshData.map(({ id, image, name }) => {
  return `<div class="col-lg-2 col-md-3 col-3 p-1">
  <div class="card  my-card" data-mesh-category-id="${id}">
    <div class="card-body p-0 text-center">
      <img
        class="card-img-top my-image-style"
        src="${image}"
      />
    </div>
    <div
      class="card-footer text-center p-0 my-footer-txt text-bold"
    >${name}</div>
  </div>
  </div>`;
});

const roofProductList = roofData.map(({ id, image, name }) => {
  return `<div class="col-xl-2 col-lg-3 col-md-3 col-3 p-1">
  <div class="card  my-card" data-roof-category-id="${id}">
    <div class="card-body p-0 text-center">
      <img
        class="card-img-top my-image-style"
        src="${image}"
      />
    </div>
    <div
      class="card-footer text-center p-1 my-footer-txt text-bold"
    >${name}</div>
  </div>
</div>`;
});
