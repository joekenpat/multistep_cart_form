const renderColorPallete = (colors, ref, indicator) => {
  $color_list = [...colors];
  if ($(`${ref} > .color-picker-wrap`).length == 0) {
    $(`${ref}`).append('<div class="color-picker-wrap"></div>');
  }
  $(".color-picker-wrap").each(function () {
    var self = $(this);
    if (self.parent().hasClass("cp-sm")) {
      self.addClass("cp-sm");
    } else if (self.parent().hasClass("cp-lg")) {
      self.addClass("cp-lg");
    }
    self.append("<ul></ul>");

    for (var i = 0; i < $color_list.length; i++) {
      var $active = "";
      self
        .children("ul")
        .append(
          "<li " +
            $active +
            ' style="background-color:' +
            $color_list[i] +
            '"></li>'
        );
    }
  });

  $(`${ref}`).on("click", "li", function () {
    var self = $(this);
    var color = rgb2hex(self.css("backgroundColor"));
    $(`${indicator}`).css("backgroundColor", color);
    if (!self.hasClass("add_new")) {
      if (!self.hasClass("active")) {
        self.siblings().removeClass("active");

        self.parents(".color-picker-wrap").children(".color-picker").val(color);

        self.addClass("active");

        if (
          self
            .parents(".color-picker-wrap")
            .children(".color-picker")
            .hasClass("cp-show")
        ) {
          self.parents(".color-picker-wrap").children("small").remove();
        }
      }
    } else {
      self
        .parents(".color-picker-wrap")
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
