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

  $("#changeProduct").on("click", function () {
    $("#step_2_content").collapse("show");
    $("#step_1_content").collapse("hide");
    $("#step_3_content").collapse("hide");
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
      $("#summaryContent").html(updateSummaryContent());
      $("#purchaseTotal").text(`$${totalAmount}`);
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
        if (selectedBuildType !== $(this).data("layout-id")) {
          resetState();
          selectedBuildType = $(this).data("layout-id");
        }
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
        $("#summarySelectedBuildType").text(
          `${selectedBuildType} (${buildTypeMap[selectedBuildType][0]["name"]}, ${buildTypeMap[selectedBuildType][1]["name"]}, ${buildTypeMap[selectedBuildType][2]["name"]}) `
        );
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
      $(`#${_x_type[0]}_${_x_type[1]}_product_select`).removeAttr("disabled");
      $(`#${_x_type[0]}_${_x_type[1]}_product_select`).toggleClass(
        "disabled",
        false
      );
    });
  });

  $(`#edge_1_product_color_selector,#edge_2_product_color_selector,
  #mesh_1_product_color_selector,#roof_1_product_color_selector,
  #roof_2_product_color_selector`).each(function () {
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

const summaryConfigProperty = (data = null) => {
  if (data == null) {
    return "";
  } else {
    return `<p class="mb-1">
    <span
      class="font-weight-bold Summary-text"
    >${data.name}:</span>
    <span
      class="ml-2 Summary-text">${data.value}
    </span>
  </p>`;
  }
};

const summarySelectedProduct = (
  layout,
  category,
  config = null,
  product,
  productPrice,
  productCost,
  color,
  subTotal
) => {
  return `<div class="col-12">
  <p class="font-weight-bold text-uppercase">${layout}</p>
  <p class="mb-1">
    <span class="font-weight-bold Summary-text">Category :</span>
    <span class="ml-2 Summary-text"> ${category}
    </span>
  </p>
  ${summaryConfigProperty(config)}
  <p class="mb-1">
    <span class="font-weight-bold Summary-text">Product :</span>
    <span class="ml-2 Summary-text">${product}
    </span>
  </p>
  <p class="mb-1">
    <span class="font-weight-bold Summary-text">Color :</span>
    <span
      class="ml-2 d-inline-block"
      style="height: 1em; width: 3em;background-color:${color};"
    ></span>
  </p>
  <p>
  <table class="table table-sm Summary-text">
  <thead>
    <tr>
      <th scope="col">Size</th>
      <th scope="col">Price</th>
      <th scope="col">Sub Cost</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td scope="row">5CM</td>
      <td>${productPrice["5CM"]}</td>
      <td>${productCost["5CM"]}</td>
    </tr>
    <tr>
    <td scope="row">10CM</td>
    <td>${productPrice["10CM"]}</td>
    <td>${productCost["10CM"]}</td>
    </tr>
    <tr>
    <td scope="row">15CM</td>
    <td>${productPrice["15CM"]}</td>
    <td>${productCost["15CM"]}</td>
    </tr>
    <tr>
    <td scope="row">30CM</td>
    <td>${productPrice["30CM"]}</td>
    <td>${productCost["30CM"]}</td>
    </tr>
  </tbody>
</table>
</p>
  <p>
    <span class="font-weight-bold Summary-text">Sub Total :</span>
    <span
      class="ml-2 Summary-text"
    >$${subTotal}</span>
  </p>
<hr/>
</div>`;
};

const updateSummaryContent = () => {
  totalAmount = 0;
  return buildTypeMap[selectedBuildType].map((x) => {
    let layoutTypeName = x.name;
    let layoutTypeNumber = x.number;
    let selectedData =
      window[
        `selected${layoutTypeName.toTitleCase()}${layoutTypeNumber}ProductData`
      ];
    let dataSource = window[`${layoutTypeName}Data`].find(
      (x) => x.id == selectedData.catId
    );
    let catName = dataSource.name;
    let catConfig = null;
    if (layoutTypeName == "roof") {
      catConfig = {
        name: dataSource.configs.name,
        value: dataSource.configs.items.find(
          (x) => x.id == selectedData.configItemId
        ).name,
      };
    }
    let product = dataSource.products.find(
      (x) => x.id == selectedData.productId
    );
    let productName = product.name;
    let productPrice = product.price;
    let productCost = {
      "5CM": Number(product.price["5CM"]) * Number(selectedDataQuantity["5CM"]),
      "10CM":
        Number(product.price["10CM"]) * Number(selectedDataQuantity["10CM"]),
      "15CM":
        Number(product.price["15CM"]) * Number(selectedDataQuantity["15CM"]),
      "30CM":
        Number(product.price["30CM"]) * Number(selectedDataQuantity["30CM"]),
    };
    let productColor = selectedData.productColor;
    let subTotal =
      productCost["30CM"] +
      productCost["15CM"] +
      productCost["10CM"] +
      productCost["5CM"];
    totalAmount += subTotal;
    return summarySelectedProduct(
      layoutTypeName,
      catName,
      catConfig,
      productName,
      productPrice,
      productCost,
      productColor,
      subTotal
    );
  });
};

const reduceQuantity = (x) => {
  _x = $(x);
  _x_size = _x.data("size");
  if (selectedDataQuantity[_x_size] - 1 < 1) {
    selectedDataQuantity[_x_size] = 1;
  } else {
    selectedDataQuantity[_x_size] -= 1;
  }
  $(`#qty${_x_size}`).val(selectedDataQuantity[_x_size]);
  $("#summaryContent").html(updateSummaryContent());
  $("#purchaseTotal").text(`$${totalAmount}`);
};

const increaseQuantity = (x) => {
  _x = $(x);
  _x_size = _x.data("size");
  if (selectedDataQuantity[_x_size] + 1 > 999999999) {
    selectedDataQuantity[_x_size] = 999999999;
  } else {
    selectedDataQuantity[_x_size] += 1;
  }
  $(`#qty${_x_size}`).val(selectedDataQuantity[_x_size]);
  $("#summaryContent").html(updateSummaryContent());
  $("#purchaseTotal").text(`$${totalAmount}`);
};
