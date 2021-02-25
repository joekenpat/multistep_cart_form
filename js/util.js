const renderColorPallete = (colors, ref, indicator) => {
  $color_list = [...colors];
  $(`${ref} > .color-picker-wrap`).remove();
  $(`${ref}`).append('<div class="color-picker-wrap"></div>');
  $(`${ref} > .color-picker-wrap`).each(function () {
    let _x = $(this);
    if (_x.parent().hasClass("cp-sm")) {
      _x.addClass("cp-sm");
    } else if (_x.parent().hasClass("cp-lg")) {
      _x.addClass("cp-lg");
    }
    _x.append("<ul></ul>");

    for (var i = 0; i < $color_list.length; i++) {
      var $active = "";
      _x.children("ul").append(
        "<li " +
          $active +
          ' style="background-color:' +
          $color_list[i] +
          '"></li>'
      );
    }
  });

  $(indicator).removeAttr("disabled");

  $(`${ref}`).on("click", "li", function () {
    let _x = $(this);
    let _x_type = ref.split("_", 2);
    let var_name = `selected${
      _x_type[0].substr(1).toTitleCase() + _x_type[1]
    }ProductData`;
    let color = rgb2hex(_x.css("backgroundColor"));
    window[var_name].productColor = color;
    $(`${indicator} > span:first-child`).css("backgroundColor", color);
    $(`${indicator} > span:last-child >p:first-child`).text(color);
    $(`${_x_type[0]}_${_x_type[1]}_form_aid`).text("");
    if (!_x.hasClass("add_new")) {
      if (!_x.hasClass("active")) {
        _x.siblings().removeClass("active");
        _x.addClass("active");
        if (
          _x
            .parents(".color-picker-wrap")
            .children(".color-picker")
            .hasClass("cp-show")
        ) {
          _x.parents(".color-picker-wrap").children("small").remove();
        }
      }
    } else {
      _x.parents(".color-picker-wrap")
        .children("input[type='color']")
        .trigger("click");
    }
  });
};
var hexDigits = new Array(
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "a",
  "b",
  "c",
  "d",
  "e",
  "f"
);

function rgb2hex(rgb) {
  rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);

  return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}

function hex(x) {
  return isNaN(x) ? "00" : hexDigits[(x - (x % 16)) / 16] + hexDigits[x % 16];
}
