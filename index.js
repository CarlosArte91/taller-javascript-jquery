/**
 * Este archivo contiene la interacción con el HTML
 * principal. Se usa JQuery para la funcionalidad de
 * los distintos botones y para crear la información
 * de la tabla.
 */


/**
 * Validación y creación de los usuarios en la tabla.
 */
$(document).ready(function() {
  var initialUsers = window.initialUsers;

  /**
   * Valida si es la primera vez que carga la página
   * y almacena en localStorage los valores iniciales.
   */
  if (!localStorage.getItem('first_time')) {
    var firstTime = { loaded: true };
    localStorage.setItem('first_time', JSON.stringify(firstTime));
    localStorage.setItem('users', JSON.stringify(initialUsers));
  }

  /**
   * Itera los usuarios del localStorage y crea las
   * filas de la tabla con la información.
   */
  if (localStorage.getItem('users')) {
    var users = JSON.parse(localStorage.getItem('users'));

    var tableBody = $('#user-table tbody');

    $.each(users, function(index, user) {
      var row = $('<tr>');
      row.append($('<td>').text(index + 1));
      row.append($('<td>').text(user.apellido));
      row.append($('<td>').text(user.nombre));
      row.append($('<td>').text(user.correo));

      var statusButton = $('<button>').addClass('status-btn').addClass(user.estado === 'Activo' ? 'activate' : 'deactivate').text(user.estado);
      statusButton.attr('data-user-index', index);
      row.append($('<td>').append(statusButton));

      row.append($('<td>').html('<button class="delete-btn">Eliminar</button>'));

      tableBody.append(row);
    });
  }
});

/**
 * Manejo de eventos para los botones de estado, eliminar y nuevo usuario.
 */
$(document).ready(function() {
  var users = JSON.parse(localStorage.getItem('users'));

  /**
   * Este bloque se ejecuta al cambiar el estado de un usuario.
   */
  $(document).on('click', '.status-btn', function() {
    var button = $(this);
    var row = button.closest('tr');
    var rowIndex = row.index();
    var userIndex = button.attr('data-user-index');

    if (button.hasClass('activate')) {
      button.text('Inactivo');
      button.removeClass('activate').addClass('deactivate');
      users[userIndex].estado = 'Inactivo';
    } else {
      button.text('Activo');
      button.removeClass('deactivate').addClass('activate');
      users[userIndex].estado = 'Activo';
    }

    localStorage.setItem('users', JSON.stringify(users));
  });

  /**
   * Este bloque se ejecuta al eliminar un usuario.
   */
  $(document).on('click', '.delete-btn', function() {
    var row = $(this).closest('tr');
    var rowIndex = row.index();

    row.remove();

    users.splice(rowIndex, 1);
    localStorage.setItem('users', JSON.stringify(users));
  });

  /**
   * Esta función redirecciona al formulario para
   * crear un nuevo usuario.
   */
  $(document).on('click', '.new-user-btn', function() {
    window.location.href = 'form/form.html';
  });
});
