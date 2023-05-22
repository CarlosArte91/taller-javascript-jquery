/**
 * Este archivo contiene la interacción con el HTML
 * del formulario de creación de usuarios. Usa JQuery
 * para la funcionalidad de los botones para crear y
 * cancelar la operación.
 */

/**
 * Manejo de eventos para los botones crear y cancelar.
 */
$(document).ready(function() {

  /**
   * Evento para crear nuevo usuario.
   */
  $(document).on('submit', '#new-user-form', function(event) {
    event.preventDefault();

    var apellido = $('#apellido').val().trim();
    var nombre = $('#nombre').val().trim();
    var correo = $('#correo').val().trim();
    var estado = $('#estado').val();

    /**
     * Validaciones del formulario usando JavaScript
     */
    if (apellido === '' || nombre === '' || correo === '') {
      alert('Por favor, completa todos los campos.');
      return;
    }

    if (apellido.length < 3) {
      alert('El apellido debe tener al menos 3 caracteres.');
      return;
    }

    if (/\d/.test(apellido)) {
      alert('El apellido no puede contener números.');
      return;
    }

    if (nombre.length < 3) {
      alert('El nombre debe tener al menos 3 caracteres.');
      return;
    }

    if (/\d/.test(nombre)) {
      alert('El nombre no puede contener números.');
      return;
    }

    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(correo)) {
      alert('Por favor, ingresa un correo electrónico válido.');
      return;
    }

    apellido = apellido.charAt(0).toUpperCase() + apellido.slice(1).toLowerCase();
    nombre = nombre.charAt(0).toUpperCase() + nombre.slice(1).toLowerCase();
    correo = correo.toLowerCase();

    var newUser = {
      apellido,
      nombre,
      correo,
      estado,
    };

    var existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    existingUsers.push(newUser);

    localStorage.setItem('users', JSON.stringify(existingUsers));
    window.location.href = '../index.html';
  });

  /**
   * Esta función redirecciona al formulario a
   * la página principal
   */
  $(document).on('click', '.cancel-btn', function(event) {
    event.preventDefault();
    window.location.href = '../index.html';
  });
});
