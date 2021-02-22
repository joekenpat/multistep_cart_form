$(document).ready(() => {
  $("#build_layout_types").html(layoutTypeContent);
  $("#edge_1_category_list, #edge_2_category_list,#edge_3_product_list").html(
    edgeProductList
  );

  $("#changeLayout, #step_1").on("click", function () {
    $("#step_1_content").collapse("show");
    $("#step_2_content").collapse("hide");
    $("#step_3_content").collapse("hide");
  });
  $("#viewSummary").on("click", function () {
    $("#step_3_content").collapse("show");
    $("#step_1_content").collapse("hide");
    $("#step_2_content").collapse("hide");
  });
  $("#roof_1_category_list, #roof_2_category_list").html(roofProductList);
  $("#mesh_1_category_list").html(meshProductList);
  $("#build_layout_types")
    .find("[data-layout-id]")
    .each(function () {
      $(this).on("click", function () {
        if ($("#step_2").hasClass("disabled")) {
          $("#step_2").toggleClass("disabled", false);
        }
        let self = $(this);
        selectedBuildType = $(this).data("layout-id");
        console.log(selectedBuildType);
        $("#step_2_content")
          .children()
          .each(function () {
            $(this).toggleClass("d-none", true);
          });
        buildTypeMap[selectedBuildType].map((x) => {
          console.log(x);
          $(
            `#step_2_content .container-fluid[data-layout-type="${x.name}"][data-layout-number="${x.number}"]`
          ).toggleClass("d-none", false);
        });
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
        $("#product_nav_actions").toggleClass("d-none", false);
        $("#step_2_content").collapse("show");
      });
    });

  $("#edge_1_category_list")
    .find("[data-edge-category-id]")
    .each(function () {
      $(this).on("click", function () {
        let self = $(this);
        console.log(self);
        updateProductList(self.data("edge-category-id"), "edge", 1);
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

  $("#edge_2_category_list")
    .find("[data-edge-category-id]")
    .each(function () {
      $(this).on("click", function () {
        let self = $(this);
        console.log(self);
        updateProductList(self.data("edge-category-id"), "edge", 2);
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

  $("#roof_1_category_list")
    .find("[data-roof-category-id]")
    .each(function () {
      $(this).on("click", function () {
        let self = $(this);
        console.log(self);
        updateProductList(self.data("roof-category-id"), "roof", 1);
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

  $("#roof_2_category_list")
    .find("[data-roof-category-id]")
    .each(function () {
      $(this).on("click", function () {
        let self = $(this);
        console.log(self);
        updateProductList(self.data("roof-category-id"), "roof", 2);
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

  $("#mesh_1_category_list")
    .find("[data-mesh-category-id]")
    .each(function () {
      $(this).on("click", function () {
        let self = $(this);
        console.log(self);
        updateProductList(self.data("mesh-category-id"), "mesh", 1);
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

});

const updateProductList = (cat_id, buildType, buildTypeNumber) => {
  let cat = edgeData.find((x) => x.id == cat_id);
  $("#step_2_content .custom-select").attr("disabled", true);
  $("#step_2_content .custom-select").toggleClass("disabled", true);
  let productSelectBox = $(`#${buildType}_${buildTypeNumber}_product_select`);
  productSelectBox.removeAttr("disabled");
  productSelectBox.toggleClass("disabled", false);
  productSelectBox.find("option").not(":first").remove();
  productSelectBox.append(categoryProductList(cat.products));
  // renderColorPallete(
  //   sel.colors,
  //   "#edge_material_color_picker",
  //   "#edge_material_color_selector"
  // );
};

const updateProductColorList = (cat_id, buildType, buildTypeNumber) => {
  let sel = edgeData.find((x) => x.id == cat_id);
  let productSelectBox = $(`#${buildType}_${buildTypeNumber}_color_select`);
  productSelectBox.find("option").not(":first").remove();
  productSelectBox.append(categoryProductList(sel.products));
  // renderColorPallete(
  //   sel.colors,
  //   "#edge_material_color_picker",
  //   "#edge_material_color_selector"
  // );
};

let categoryProductList = (products = []) => {
  return products.map((x) => {
    return `<option value="${x.id}">${x.name}</option>`;
  });
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
