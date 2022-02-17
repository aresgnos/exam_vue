<template>
    <div>
        <h3>게시판목록</h3>
        <div v-if="state.items">        
            <el-button type="info" @click="handleWrite" style="margin-right:10px;margin-bottom:10px;float:right">글쓰기</el-button>
            <el-button type="info" @click="handleLoadData" style="margin-right:10px;margin-bottom:10px;float:right">검색</el-button>
            <el-input v-model="state.text" @keyup.enter="handleLoadData" placeholder="검색어" 
                style="width:300px;margin-right:10px;margin-bottom:10px;float:right" />

        <el-table :data="state.items" @row-click="rowClick" style="width: 100%">
            <el-table-column prop="_id" label="글번호" width="180" />
            <el-table-column prop="title" label="제목" width="180" />
            <el-table-column prop="writer" label="작성자" />
            <el-table-column prop="hit" label="조회수" />
            <el-table-column prop="regdate" label="작성일자" />
        </el-table>
        <el-pagination layout="prev, pager, next" :total="state.total2" 
            @current-change="currentChange"></el-pagination>
        </div>
        
        
    </div>
    
</template>

<script>
import axios from 'axios';
import { onMounted, reactive } from 'vue';
import { useRouter } from 'vue-router';

    export default {
        setup () {

            const router = useRouter();

            const state = reactive({
                page : 1,
                text : '',
                total : 0
            });

            // 상세화면 넘어가기
            // 조회수 증가
           const rowClick = async(row) => {
                const url = `/board/updatehit?no=${row._id}`;
                const headers = {
                    "Content-Type":"application/json"
                }
                const response = await axios.put(url, { }, {headers:headers});
                console.log(response.data);
                console.log(row._id);
                console.log('Board.vue => rowClick', row);

                router.push({name:"Content", query:{no:row._id}});
           }

            const currentChange = (page) =>{
                console.log('Board.vue => currentChange', page);
                state.page = page;
                handleLoadData();
            }

            // 페이지네이션
            const handlePagination = (tmp) =>{
                state.page = Number(tmp);
                handleLoadData();
            }

            // 글쓰기 화면으로
            const handleWrite = () => {
                router.push({name:"Write"})
            }

            const handleLoadData = async() => {
                const url = `/board/select?page=${state.page}&text=${state.text}`;
                const headers = {
                    "Content-Type":"application/json"
                }
                const response = await axios.get(url, {headers:headers});
                console.log(response.data);

                if(response.data.status===200){
                    state.items = response.data.rows;
                    // 1-10 => 1 => Math.floor( (page-1)/10+1 )
                    // 11-20 => 2
                    state.total = Math.floor( (Number(response.data.total)-1)/10+1 );
                    state.total2 = response.data.total;
                    
                }
            }

            onMounted(() => {
                handleLoadData();
            })
            return {state, handleLoadData, handleWrite, 
                    handlePagination, currentChange, rowClick}
        }
        
    }
</script>

<style lang="scss" scoped>

</style>