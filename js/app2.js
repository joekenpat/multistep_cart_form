$(document).ready(() => {
  $("#build_layout_types").html(layoutTypeContent);
  $("#edge_product_list").html(edgeProductList);
  $("#mesh_product_list").html(meshProductList);
  $("#roof_product_list").html(roofProductList);
  $("#build_layout_types")
    .find("[data-layout-id]")
    .each(function () {
      $(this).on("click", ".card", function () {
        if ($("#step_2").hasClass("disabled")) {
          $("#step_2").toggleClass("disabled", false);
        }
        let self = $(this);
        selectedLayoutType = $(this).data("layout-id");
        if (!self.hasClass("active-selected-build")) {
          self
            .parent()
            .siblings()
            .children(".card")
            .removeClass("active-selected-build");
          self.toggleClass("active-selected-build", true);
        } else {
          self.toggleClass("active-selected-build", true);
        }
      });
    });
  $("#edge_product_list")
    .find("[data-product-id]")
    .each(function () {
      $(this).on("click", ".card", function () {
        let self = $(this);
        if ($("#step_2").hasClass("disabled")) {
          $("#step_2").toggleClass("disabled", false);
        }
        updateEdgeMaterialList(self.parent().data("product-id"));
        if (!self.hasClass("active-selected-build")) {
          self
            .parent()
            .siblings()
            .children(".card")
            .removeClass("active-selected-build");
          self.toggleClass("active-selected-build");
        } else {
          self.toggleClass("active-selected-build");
        }
      });
    });

  $("#edge_material_color_selector").on("click", function () {
    $("#edge_material_color_picker").toggleClass("show");
  });

  $("#mesh_product_list")
    .find("[data-product-id]")
    .each(function () {
      $(this).on("click", ".card", function () {
        let self = $(this);
        updateMeshMaterialList(self.parent().data("product-id"));
        if (!self.hasClass("active-selected-build")) {
          self
            .parent()
            .siblings()
            .children(".card")
            .removeClass("active-selected-build");
          self.toggleClass("active-selected-build");
        } else {
          self.toggleClass("active-selected-build");
        }
      });
    });

  $("#mesh_material_color_selector").on("click", function () {
    $("#mesh_material_color_picker").toggleClass("show");
  });

  $("#roof_product_list")
    .find("[data-product-id]")
    .each(function () {
      $(this).on("click", ".card", function () {
        let self = $(this);
        updateRoofMaterialList(self.parent().data("product-id"));
        if (!self.hasClass("active-selected-build")) {
          self
            .parent()
            .siblings()
            .children(".card")
            .removeClass("active-selected-build");
          self.toggleClass("active-selected-build");
        } else {
          self.toggleClass("active-selected-build");
        }
      });
    });

  $("#roof_material_color_selector").on("click", function () {
    $("#roof_material_color_picker").toggleClass("show");
  });
});

const updateEdgeMaterialList = (e) => {
  let sel = edgeProducts.find((x) => x.id == e);
  egdeMaterialSelect.find("option").not(":first").remove();
  egdeMaterialSelect.append(edgeMaterials(sel.materials));
  renderColorPallete(
    sel.colors,
    "#edge_material_color_picker",
    "#edge_material_color_selector"
  );
};

const updateMeshMaterialList = (e) => {
  let sel = meshProducts.find((x) => x.id == e);
  meshWidthSelect.find("option").not(":first").remove();
  meshWidthSelect.append(meshWidths(sel.widths));
  renderColorPallete(
    sel.colors,
    "#mesh_material_color_picker",
    "#mesh_material_color_selector"
  );
};

const updateRoofMaterialList = (e) => {
  let sel = roofProducts.find((x) => x.id == e);
  roofMaterialSelect.find("option").not(":first").remove();
  roofMaterialSelect.append(roofMaterials(sel.materials));
  if (sel.extraConfig) {
    roofConfigSelect.find("option").not(":first").remove();
    roofConfigSelect.append(roofConfigs(sel.extraConfig));
  } else {
  }
  renderColorPallete(
    sel.colors,
    "#roof_material_color_picker",
    "#roof_material_color_selector"
  );
};

const egdeMaterialSelect = $("#edge_material_select");
let edgeMaterials = (materials = []) => {
  return materials.map((x) => {
    return `<option value="${x}">${x.replace("_", " ")}</option>`;
  });
};

const meshWidthSelect = $("#mesh_width_select");
let meshWidths = (withds = []) => {
  return withds.map((x) => {
    return `<option value="${x}">${x}</option>`;
  });
};

const roofMaterialSelect = $("#roof_material_select");
let roofMaterials = (materials = []) => {
  return materials.map((x) => {
    return `<option value="${x}">${x.replace("_", " ")}</option>`;
  });
};

const roofConfigSelect = $("#roof_config_select");
let roofConfigs = (configs = []) => {
  return configs.map((x) => {
    return `<option value="${x}">${x}</option>`;
  });
};

const layoutTypeContent = layoutTypes.map((x) => {
  return `<div class="col-4 p-1" data-layout-id="${x}">
  <div class="card my-card">
    <div class="card-body text-center">
      <p class="build-type-txt mb-0">${x}</p>
    </div>
  </div>
</div>`;
});

const edgeProductList = edgeProducts.map((x) => {
  return `<div class="col-4 p-1" data-product-id="${x.id}">
  <div class="card  my-card">
    <div class="card-body p-0 text-center">
      <img
        class="card-img-top my-image-style"
        src="${x.image}"
      />
    </div>
    <div
      class="card-footer text-center p-1 my-footer-txt text-bold"
    >${x.name}</div>
  </div>
</div>`;
});

const meshProductList = meshProducts.map((x) => {
  return `<div class="col-4 p-1" data-product-id="${x.id}">
  <div class="card  my-card">
    <div class="card-body p-0 text-center">
      <img
        class="card-img-top my-image-style"
        src="${x.image}"
      />
    </div>
    <div
      class="card-footer text-center p-1 my-footer-txt text-bold"
    >${x.name}</div>
  </div>
  </div>`;
});
const roofProductList = roofProducts.map((x) => {
  return `<div class="col-4 p-1" data-product-id="${x.id}">
  <div class="card  my-card">
    <div class="card-body p-0 text-center">
      <img
        class="card-img-top my-image-style"
        src="${x.image}"
      />
    </div>
    <div
      class="card-footer text-center p-1 my-footer-txt text-bold"
    >${x.name}</div>
  </div>
</div>`;
});
