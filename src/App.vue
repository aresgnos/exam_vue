<template>
  <div>

    <el-container>

      <el-header>
        <el-menu default-active="/" 
        class="el-menu-demo"
        mode="horizontal"
        :router = "true">

        <el-menu-item index="/">Home</el-menu-item>
        <el-menu-item index="/board">Board</el-menu-item>
        <el-menu-item index="/write">Write</el-menu-item>
    
        </el-menu>
      </el-header>

      <el-main>
        <router-view></router-view>
      </el-main>

      <el-footer>Footer</el-footer>

    </el-container>
    
    
    
    

  </div>
</template>

<script>
  export default {
    setup() {

      return{}
    }
    
  }
</script>

<style lang="css" scoped>
.el-footer {
  text-align : center;
  border-top : 1px #e6e6e6 solid;
  padding : 20px;
}

</style>