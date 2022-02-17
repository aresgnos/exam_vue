<template>
    <div>
        <h3>게시판 글쓰기</h3>
        <div style="width:800px;">
        <el-form label-width="100px" >
            <el-form-item label="제목">
                <el-input v-model="state.title" ></el-input>
            </el-form-item>
            <el-form-item label="내용">
                <el-input v-model="state.content"
                    :rows="5"
                    type="textarea"
                    minlength="3"
                />
            </el-form-item>
            <el-form-item label="작성자">
                <el-input v-model="state.writer" ></el-input>
            </el-form-item>
            <el-form-item label="이미지">
                <input type="file" @change="handleImage($event)" />
            </el-form-item>
            </el-form>

        <el-button type="info" @click="handleBoardWrite">글쓰기</el-button>
        </div>
    </div>
</template>

<script>
import { reactive } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router';

    export default {
        setup (){

            const router = useRouter();
            
            const state = reactive({
                title : '',
                content : '',
                writer : '',
                image : '',
            })

            // handleImage($event)
            const handleImage = (e) => {
                console.log(e);
                if(e.target.files[0]){
                    state.image = e.target.files[0];
                }
                else {
                    state.image = '';
                }
            }

            // 
            const handleBoardWrite = async() => {
                if(state.title===''){
                    alert('제목을 입력하세요.');
                    return false;
                }
                if(state.content===''){
                    alert('내용을 입력하세요.');
                    return false;
                }
                if(state.writer===''){
                    alert('작성자를 입력하세요.');
                    return false;
                }
                if(state.image===''){
                    alert('이미지를 첨부하세요.');
                    return false;
                }

                const url = `/board/insert`;
                const headers = {"Content-Type":"multipart/form-data"};
                const body = new FormData();
                body.append("title", state.title);
                body.append("content", state.content);
                body.append("writer", state.writer);
                body.append("image", state.image);

                const response = await axios.post(url, body, {headers});
                console.log(response.data);
                if(response.data.status===200){
                    alert('글쓰기 완료');
                    router.push({name:"Board"})
                }
            }

            return {state, handleImage, handleBoardWrite}
        }
        
    }
</script>

<style lang="scss" scoped>

</style>