Feature: Login de usuario

  Scenario: Acceder con credenciales válidas
    Given que estoy en la página de login
    When ingreso el usuario "3205186903" y la contraseña "Matias*4925**"
    And doy clic en el botón de login
    Then debo ver el mensaje "Antes de ingresar validaremos tu número de celular.Presiona OK para continuar"
