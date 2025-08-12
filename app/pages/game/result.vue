<script setup lang="ts">
import { useGameStore } from '~/store/game.store';

definePageMeta({
  title: 'Game Result'
})

const store = useGameStore()

</script>

<template>
    <table class="result-table">
        <thead>
        <tr>
            <th>ALL_USER_WINS</th>
            <th>ALL_USER_BETS</th>
            <th>RTP</th>
        </tr>
        </thead>
        <tbody>
            <tr>
                <td>{{ store.all_user_wins }}</td>
                <td>{{ store.all_bets }}</td>
                <td>{{ store.RTP }}%</td>
            </tr>
        </tbody>
    </table>
</template>

<style scoped>
.result-table {
  width: 80%;
  border-collapse: collapse;
  text-align: center;
  table-layout: fixed;
}

.result-table th,
.result-table td {
  border: 2px solid #000000;
  padding: 8px 12px;
  width: 33.33%;
 
}

.result-table thead th {
  background-color: #6e6e6e;
  font-weight: normal;
}
</style>