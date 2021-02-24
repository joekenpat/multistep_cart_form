$(document).ready(() => {
  $("#build_layout_types").html(layoutTypeContent);
  $("#edge_1_category_list, #edge_2_category_list,#edge_3_product_list").html(
    edgeProductList
  );

  $("#changeLayout, #step_1").on("click", function () {
    $("#step_1_content").collapse("show");
    $("#step_2_content").collapse("hide");
    $("#step_3_content").collapse("hide");
    resetState();
  });

  $("#viewSummary").on("click", function () {
    let formNotCompleted = true;

    buildTypeMap[selectedBuildType].map((x) => {
      let required =
        window[`selected${x.name.toTitleCase()}${x.number}ProductData`];
      formNotCompleted = !Object.values(required).some(
        (x) => x !== null && x !== ""
      );
    });

    console.log({ formNotCompleted: formNotCompleted });
    if (formNotCompleted) {
      let formMessages = document.getElementById("formMessages");
      $("#formMessages").html(formErrorAlert());
      $("#formMessages").toggleClass("d-none", false);
      formMessages.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    } else {
      $("#step_3_content").collapse("show");
      $("#step_1_content").collapse("hide");
      $("#step_2_content").collapse("hide");
    }
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
        $("#step_2_content")
          .children()
          .each(function () {
            $(this).toggleClass("d-none", true);
          });
        buildTypeMap[selectedBuildType].map((x) => {
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

  $(
    "#edge_1_category_list,#edge_2_category_list,#mesh_1_category_list,#roof_1_category_list,#roof_2_category_list"
  ).each(function () {
    let _x = $(this);
    let _x_id = _x.attr("id");
    let _x_type = _x_id.split("_", 2);
    _x.find(`[data-${_x_type[0]}-category-id]`).each(function () {
      $(this).on("click", function () {
        let _xy = $(this);
        let var_name = `selected${
          _x_type[0].toTitleCase() + _x_type[1]
        }ProductData`;
        window[var_name] = {
          catId: _xy.data(`${_x_type[0]}-category-id`),
          productId: "",
          productColor: "",
        };
        if (_x_type[0] == "roof") {
          updateConfigList(
            _xy.data(`${_x_type[0]}-category-id`),
            _x_type[0],
            _x_type[1]
          );
        }
        updateProductList(
          _xy.data(`${_x_type[0]}-category-id`),
          _x_type[0],
          _x_type[1]
        );
        if (!_xy.hasClass("active-selected-build")) {
          _xy
            .parent()
            .siblings()
            .children(".card")
            .removeClass("active-selected-build");
          _xy.toggleClass("active-selected-build");
        } else {
          _xy.toggleClass("active-selected-build");
        }
      });
    });
  });

  $(
    "#edge_1_product_select,#edge_2_product_select,#mesh_1_product_select,#roof_1_product_select,#roof_2_product_select"
  ).each(function () {
    $(this).on("change", () => {
      let _x = $(this);
      let _x_id = _x.attr("id");
      let _x_value = _x.val();
      let _x_type = _x_id.split("_", 2);
      let var_name = `selected${
        _x_type[0].toTitleCase() + _x_type[1]
      }ProductData`;
      window[var_name] = {
        ...window[var_name],
        productId: _x_value,
        productColor: "",
      };
      let colors = window[`${_x_type[0]}Data`]
        .find((x) => x.id == window[var_name].catId)
        .products.find((y) => y.id == _x_value).colors;
      let colorSelectBoxRef = `#${_x_type[0]}_${_x_type[1]}_product_color_picker`;
      let colorSelectIndicatorRef = `#${_x_type[0]}_${_x_type[1]}_product_color_selector`;
      console.log(colorSelectBoxRef, colorSelectIndicatorRef);
      renderColorPallete(colors, colorSelectBoxRef, colorSelectIndicatorRef);
    });
  });

  $("#roof_1_config_select,#roof_2_config_select").each(function () {
    $(this).on("change", () => {
      let _x = $(this);
      let _x_id = _x.attr("id");
      let _x_value = _x.val();
      let _x_type = _x_id.split("_", 2);
      let var_name = `selected${
        _x_type[0].toTitleCase() + _x_type[1]
      }ProductData`;
      window[var_name].configItemId = _x_value;
      console.log(window[var_name]);
      $(`#${_x_type[0]}_${_x_type[1]}_product_select`).removeAttr("disabled");
      $(`#${_x_type[0]}_${_x_type[1]}_product_select`).toggleClass(
        "disabled",
        false
      );
    });
  });

  $(
    "#edge_1_product_color_selector,#edge_2_product_color_selector,#mesh_1_product_color_selector,#roof_1_product_color_selector,#roof_2_product_color_selector"
  ).each(function () {
    $(this).on("click", function () {
      let _x = $(this);
      let _x_id = _x.attr("id");
      let _x_type = _x_id.split("_", 2);
      $(`#${_x_type[0]}_${_x_type[1]}_product_color_picker`).toggleClass(
        "show"
      );
    });
  });
});

const updateProductList = (cat_id, buildType, buildTypeNumber) => {
  $(`#${buildType}_${buildTypeNumber}_product_color_selector`).attr(
    "disabled",
    true
  );
  $(`#${buildType}_${buildTypeNumber}_product_color_selector`).toggleClass(
    "disabled",
    true
  );
  let cat = window[`${buildType}Data`].find((x) => x.id == cat_id);
  let productSelectBox = $(`#${buildType}_${buildTypeNumber}_product_select`);
  if (buildType != "roof") {
    productSelectBox.removeAttr("disabled");
    productSelectBox.toggleClass("disabled", false);
  }
  productSelectBox.find("option").not(":first").remove();
  productSelectBox.append(categoryProductList(cat.products));
};

const updateConfigList = (cat_id, buildType, buildTypeNumber) => {
  let sel = roofData.find((x) => x.id == cat_id);
  let configSelectBox = $(`#${buildType}_${buildTypeNumber}_config_select`);
  configSelectBox.removeAttr("disabled");
  configSelectBox.toggleClass("disabled", false);
  configSelectBox.find("option").not(":first").remove();
  configSelectBox.find("option:first").text(`-- ${sel.configs.name} --`);
  configSelectBox.append(categoryConfigList(sel.configs.items));
};

const categoryConfigList = (categoryProductList = (data = []) => {
  return data.map((x) => {
    return `<option value="${x.id}">${x.name}</option>`;
  });
});

const updateRoofMaterialList = (e) => {
  let sel = roofProducts.find((x) => x.id == e);
  roofMaterialSelect.find("option").not(":first").remove();
  roofMaterialSelect.append(roofMaterials(sel.materials));
  if (sel.extraConfig) {
    roofConfigSelect.find("option").not(":first").remove();
    roofConfigSelect.append(roofConfigs(sel.extraConfig));
  } else {
  }
  // renderColorPallete(
  //   sel.colors,
  //   "#roof_material_color_picker",
  //   "#roof_material_color_selector"
  // );
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
