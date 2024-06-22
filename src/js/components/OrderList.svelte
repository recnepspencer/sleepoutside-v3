<script>
    import { onMount } from 'svelte';
    import { getOrders } from '../externalServices.mjs';
  
    let orders = [];
  
    onMount(async () => {
      try {
        orders = await getOrders();
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    });
  </script>
  
  <style>
    /* Add your styles here */
    .order-list {
      max-width: 800px;
      margin: auto;
      padding: 1em;
      border: 1px solid #ccc;
      border-radius: 4px;
      background: #f9f9f9;
    }
  
    .order-item {
      padding: 0.5em;
      border-bottom: 1px solid #ccc;
    }
  
    .order-item:last-child {
      border-bottom: none;
    }
  </style>
  
  <div class="order-list">
    {#if orders.length > 0}
      {#each orders as order}
        <div class="order-item">
          <h3>Order ID: {order.id}</h3>
          <p>Customer: {order.customerName}</p>
          <p>Total: ${order.total}</p>
          <!-- Add more order details as needed -->
        </div>
      {/each}
    {:else}
      <p>No orders found.</p>
    {/if}
  </div>
  