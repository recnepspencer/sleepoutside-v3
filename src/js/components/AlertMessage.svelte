<script>
    export let message = '';
  </script>
  
  <style>
    .alert {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      background-color: var(--primary-color);
      color: white;
      padding: 1em;
      text-align: center;
      font-size: 1.2em;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
      z-index: 1000;
    }
  </style>
  
  <div class="alert">
    {@html message}
  </div>
  