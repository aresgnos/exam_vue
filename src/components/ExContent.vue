<template>
    <div>
        <h3>게시판 상세내용</h3>

            <div v-if="state.item">
            <div v-show="state.editable===false">

            <el-descriptions :column="2" border>
                <el-descriptions-item label="글번호" label-align="center">{{state.item._id}}</el-descriptions-item>
                <el-descriptions-item label="제목" label-align="center">{{state.item.title}}</el-descriptions-item>
                <el-descriptions-item label="작성자" label-align="center">{{state.item.writer}}</el-descriptions-item>
                <el-descriptions-item label="작성일자" label-align="center">{{state.item.regdate}}</el-descriptions-item>
                <el-descriptions-item label="조회수" label-align="center">{{state.item.hit}}</el-descriptions-item>
                <el-descriptions-item label="내용" label-align="center">{{state.item.content}}</el-descriptions-item>
                <el-descriptions-item label="이미지" label-align="center"><img :src="state.item.imageurl" style="width:500px" /></el-descriptions-item>
            </el-descriptions>

                <el-button type="info" @click="handleDelete" style="float:right;margin-right:10px;margin-top:10px;">삭제</el-button>
                <el-button type="info" @click="state.editable=true" style="float:right;margin-right:10px;margin-top:10px;">수정</el-button>
                
                <el-button type="info" @click="handleNext" style="float:right;margin-top:10px;"
                    :disabled="state.item.next===0">다음글</el-button>
                    <el-button type="info" @click="handlePrev" style="float:right;margin-top:10px;"
                    :disabled="state.item.prev===0">이전글</el-button>

            </div>
        
            <div v-show="state.editable===true" style="width:600px;padding:20px;">
                <el-form label-width="100px" >
                <el-form-item label="제목">
                    <el-input v-model="state.item1.title"></el-input>
                </el-form-item>

                <el-form-item label="내용">
                    <el-input v-model="state.item1.content" ></el-input>
                </el-form-item>
                </el-form>

                <el-button type="info" @click="state.editable=false" style="float:right">수정취소</el-button>
                <el-button type="info" @click="handleUpdateAction" style="float:right;margin-right:10px;">수정완료</el-button>

            </div>
            </div>

    </div>
</template>

<script>
import { onMounted, reactive } from 'vue';
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';
import axios from 'axios';

    export default {
        setup() {

            const route = useRoute();
            const router = useRouter();

            const state = reactive ({
                no : route.query.no,
                editable : false //수정
            })

            // 삭제
            const handleDelete = async() => {
                if(confirm('삭제할까요?')){
                    const url = `/board/delete?no=${state.no}`;
                    const headers = {"Content-Type":"application'json"};
                    const response = await axios.delete(url, {headers:headers, data:{}});

                    console.log(response.data);
                    if(response.data.status===200){
                        router.push({name:"Board", query:{page:1, text:''}});
                    }       
                }
            }

            // 이전글
            const handlePrev = async() => { 
                // 이전 글번호를 현재 글번호에 넣음 
                state.no = state.item.prev;
                router.push({name:"Content", query:{no:state.no}});
                handleLoadData();
                state.editable = false;

                // if(state.item.prev===0){
                //     button.disabled=true;
                // }
            }

            // 다음글
            const handleNext = () => {
                state.no = state.item.next;
                router.push({name:"Content", query:{no:state.no}});
                handleLoadData();
                state.editable = false;

                // if(state.item.next===0){
                //     button.disabled=true;
                // }
            }

            // 글 상세화면
            const handleLoadData = async () => {
                const url = `/board/selectone?no=${state.no}`;
                const headers = {"Content-Type":"application/json"}
                const response = await axios.get(url, {headers:headers});

                console.log(response.data);

                if(response.data.status===200){
                    state.item = response.data.result;

                    // 저장변수 =Object.create(복사할 값)
                    state.item1 = Object.create(state.item);
                }
            }

            // 수정
            const handleUpdateAction = async () => {
                const url = `/board/update?no=${state.no}`;
                const headers = {"Content-Type":"application/json"}
                const body = {
                    title : state.item1.title,
                    content : state.item1.content
                }
                const response = await axios.put(url, body, {headers:headers});
                console.log(response.data);
                if(response.data.status===200){
                    alert('수정되었습니다.');
                    state.editable=false
                    handleLoadData();
                }
            }

            onMounted( ()=>{
                handleLoadData();
            })

            return {state, handleLoadData, handlePrev, handleNext, handleDelete, handleUpdateAction}
        }
        
    }
</script>

<style lang="css" scoped>


</style>