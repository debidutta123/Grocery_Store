$(function () {
  $.get(orderListApiUrl, function (response) {
    console.log("API Response:", response);

    window.ordersData = response;

    var table = "";
    var totalCost = 0;

    $.each(response, function (index, order) {
      totalCost += parseFloat(order.total);

      table +=
        "<tr>" +
        "<td>" +
        order.datetime +
        "</td>" +
        "<td>" +
        order.order_id +
        "</td>" +
        "<td>" +
        order.customer_name +
        "</td>" +
        "<td>" +
        parseFloat(order.total).toFixed(2) +
        " Rs</td>" +
        "<td><button type='button' class='btn btn-primary btn-sm view-order' data-id='" +
        order.order_id +
        "'>View</button></td>" +
        "</tr>";
    });

    $("table tbody").html(table);
  });
});

$(document).on("click", ".view-order", function () {
  var orderId = parseInt($(this).attr("data-id"));

  console.log("Order ID:", orderId);

  var selectedOrder = window.ordersData.find(function (order) {
    return order.order_id == orderId;
  });

  console.log("Selected Order:", selectedOrder);

  if (!selectedOrder) {
    alert("Order not found");
    return;
  }

  var rows = "";

  $.each(selectedOrder.order_details, function (index, item) {
    rows +=
      "<tr>" +
      "<td>" +
      item.product_name +
      "</td>" +
      "<td>" +
      item.price_per_unit +
      "</td>" +
      "<td>" +
      item.quantity +
      "</td>" +
      "<td>" +
      item.total_price +
      "</td>" +
      "</tr>";
  });

  console.log("Generated Rows:", rows);

  $("#orderDetailsBody").html(rows);

  $("#orderDetailsModal").modal("show");
});
