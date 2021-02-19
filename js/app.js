const layoutTypes = ["EMR", "RMR", "EME"];

const layoutTypeSteps = {
  EMR: ["EDGE", "MESH", "ROOF"],
  RMR: ["ROOF", "MESH", "ROOF"],
  EME: ["EDGE", "MESH", "EDGE"],
};
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
const edgeProducts = [
  {
    id: "E1",
    name: "Trim",
    image: "https://lorempisum.com/320/320/jpeg",
    materials: ["default", "new_material"],
    price: 133.83,
  },
];

const selectedEdge = {
  id: "E1",
  name: "Trim",
  material: "new_material",
  color: "#545b54",
  quantity: 3,
};

const selectEdgeProduct = (e) => {
  let sel = edgeProducts.find((x) => x.id == $(e).data("product_id"));
  selectedEdge = {
    id: sel.id,
    name: sel.name,
    material: sel.materials[0],
    color: colourCodes[0],
    quantity: 1,
  };
};

const selectEdgeProductMaterial = (e) => {
  selectedEdge = { ...selectedEdge, material: e.value };
};

const selectEdgeProductQuantity = (e) => {
  selectedEdge = { ...selectedEdge, quantity: e.value };
};

const selectEdgeProductColor = (e) => {
  selectedEdge = { ...selectedEdge, color: e.value };
};

const meshProducts = [
  {
    id: "M1",
    name: "Fine Mesh",
    image: "https://lorempisum.com/320/320/jpeg",
    widths: ["1cm", "2cm", "4cm"],
    price: 33.83,
  },
];

const selectedMesh = {
  id: "M1",
  name: "Fine Mesh",
  width: "2cm",
  color: "#88a0a6",
  quantity: 3,
};

const selectMeshProduct = (e) => {
  let sel = meshProducts.find((x) => x.id == $(e).data("product_id"));
  selectedMesh = {
    id: sel.id,
    name: sel.name,
    width: sel.widths[0],
    color: colourCodes[0],
    quantity: 1,
  };
};

const selectMeshProductMaterial = (e) => {
  selectedMesh = { ...selectedEdge, material: e.value };
};

const selectMeshProductQuantity = (e) => {
  selectedMesh = { ...selectedMesh, quantity: e.value };
};

const selectMeshProductColor = (e) => {
  selectedMesh = { ...selectedMesh, Color: e.value };
};

const roofProducts = [
  {
    id: "R1",
    name: "Corro",
    image: "https://lorempisum.com/320/320/jpeg",
    materials: ["plain", "smooth"],
    price: 33.83,
    extraConfig: ["PM-1", "PM-2", "CA-4"],
  },
];

const selectedRoof = {
  id: "R1",
  name: "Corro",
  materials: "smooth",
  color: "#33393c",
  extraConfig: "PM-2",
  quantity: 3,
};

const selectRoofProduct = (e) => {
  let sel = roofProducts.find((x) => x.id == $(e).data("product_id"));
  selectedRoof = {
    id: sel.id,
    name: sel.name,
    materials: sel.materials[0],
    color: colourCodes[0],
    extraConfig: sel.extraConfig ? sel.extraConfig[0] : "",
    quantity: 1,
  };
};

const selectRoofProductMaterial = (e) => {
  selectedRoof = { ...selectedRoof, material: e.value };
};

const selectRoofProductExtraConfig = (e) => {
  selectedRoof = { ...selectedRoof, extraConfig: e.value };
};

const selectRoofProductQuantity = (e) => {
  selectedRoof = { ...selectedRoof, quantity: e.value };
};

const selectRoofProductColor = (e) => {
  selectedRoof = { ...selectedRoof, Color: e.value };
};
