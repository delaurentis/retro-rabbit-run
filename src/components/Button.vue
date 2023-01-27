<!-- HTML --> 
<!-- Structure: Where does everything go? -->
<template>
  <div class="button">
    <span class="button-text">
      <slot/>
    </span>
  </div>
</template>

<!-- CSS --> 
<!-- Style: How does it look? -->
<style scoped>
.button {
  background-color: rgb(165, 252, 187);
  border: 1px solid rgba(0,0,0,0.15);
  height: 50px;
  justify-content: center;
  align-items: center;
  display: flex;
  font-size: 16px;
  vertical-align: middle;
  cursor: pointer;
  padding: 0px 20px 0px 20px;
  border-radius: 5px;
  user-select: none;
  -moz-user-select: none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  color: rgba(0,0,0,0.5);
  transform: translate3d(0px,0px,0px);
}
.button:active {
  transform: translate(1px, 1px);
  filter: brightness(0.95) saturate(1.5);
}
.button-text {
  margin-top: 1px;
}
</style>