$(document).ready(() => {
    $('#build_layout_types').html(layoutTypeContent);
    $('#edge_product_list').html(edgeProductList);
    $('#build_layout_types').find('[data-layout-id]').each(function() {
        $(this).on('click', function() {
            selectedLayoutType = $(this).data('layout-id');
        });
    });
  $("#edge_product_list")
    .find("[data-product-id]")
    .each(function () {
      $(this).on("click", function () {
        updateEdgeMaterialList($(this).data("product-id"));
      });
    });
});

const updateEdgeMaterialList = (e) => {
  let sel = edgeProducts.find((x) => x.id == e).materials;
  egdeMaterialSelect.find("option").not(":first").remove();
  egdeMaterialSelect.append(edgeMaterials(sel));
};
const egdeMaterialSelect = $("#edge_material_select");
let edgeMaterials = (materials = []) => {
  return materials.map((x) => {
    return `<option value="${x}">${x.replace("_"," ")}</option>`;
  });
};
const layoutTypeContent = layoutTypes.map((x) => {
  return `<div class="col-4 px-1" data-layout-id="${x}">
  <div class="card" >
    <div class="card-body text-center">
      <p class="build-type-txt mb-0">${x}</p>
    </div>
  </div>
</div>`;
});

const edgeProductList = edgeProducts.map(x => {
    return `<div class="col-4 px-1">
  <div class="card" data-product-id="${x.id}">
    <div class="card-body p-0 text-center">
      <img
        class="card-img-top my-image-style"
        src="${x.image}"
      />
    </div>
    <div
      class="card-footer text-center p-1 my-footer-txt text-muted text-bold"
    >${x.name}</div>
  </div>
</div>`;
});

