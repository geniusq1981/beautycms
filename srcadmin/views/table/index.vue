<template>
  <div class="app-container">
  <!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.name" placeholder="关键字"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getUsers">查询</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="handleAdd">新增</el-button>
				</el-form-item>
			</el-form>
		</el-col>
    <el-table :data="list" v-loading="listLoading" element-loading-text="Loading" border highlight-current-row >
      <el-table-column align="center" label='ID' width="95">
        <template slot-scope="scope">
          {{scope.$index}}
        </template>
      </el-table-column>
	   <el-table-column label="题目" align="center" sortable>
        <template slot-scope="scope">
          {{scope.row.slug}}
        </template>
      </el-table-column>
      <el-table-column label="分类" width="110" align="center" sortable>
        <template slot-scope="scope">
          {{scope.row.category}}
        </template>
      </el-table-column>
	  <el-table-column label="关键词" width="110" align="center" sortable>
        <template slot-scope="scope">
          {{scope.row.tags}}
        </template>
      </el-table-column>
      <!--<el-table-column class-name="status-col" label="摘要" width="300" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.des}}</span>
        </template>
      </el-table-column>-->
      <el-table-column align="center" prop="created_at" label="发表时间">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span>{{scope.row.date}}</span>
        </template>
      </el-table-column>
	  <el-table-column align="center" label="操作" width="200">
				<template slot-scope="scope">
					<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
    </el-table>
	<!--编辑界面-->
    <div v-if="editFormVisible">sdfsf</div>
		<el-dialog title="编辑" :visible.sync="editFormVisible" :close-on-click-modal="false">        
			<el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
				<el-form-item label="文件名" prop="title">
					<el-input v-model="editForm.title" auto-complete="off"></el-input>
				</el-form-item>
                <el-form-item label="题目" prop="slug">
					<el-input v-model="editForm.slug" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="分类">
					<el-input v-model="editForm.category" :min="0" :max="200"></el-input>
				</el-form-item>
				<el-form-item label="标签">
					<el-input v-model="editForm.tags" :min="0" :max="200"></el-input>
				</el-form-item>
				<el-form-item label="发表时间">
					<el-date-picker type="datetime" placeholder="选择日期" v-model="editForm.date"></el-date-picker>
				</el-form-item>
				<el-form-item label="摘要">
					<el-input type="textarea" v-model="editForm.des"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
			</div>
		</el-dialog>

        <!--新增界面-->
		<el-dialog title="新增" :visible.sync="addFormVisible" :close-on-click-modal="false">
			<el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
				<el-form-item label="文件名" prop="title">
					<el-input v-model="addForm.title" auto-complete="off"></el-input>
				</el-form-item>
                <el-form-item label="题目" prop="slug">
					<el-input v-model="addForm.slug" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="分类">
					<el-input v-model="addForm.category" :min="0" :max="200"></el-input>
				</el-form-item>
				<el-form-item label="标签">
					<el-input v-model="addForm.tags" :min="0" :max="200"></el-input>
				</el-form-item>
				<el-form-item label="发表时间">
					<el-date-picker type="datetime" placeholder="选择日期" v-model="addForm.date"></el-date-picker>
				</el-form-item>
				<el-form-item label="摘要">
					<el-input type="textarea" v-model="addForm.des"></el-input>
				</el-form-item>
			</el-form>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="addFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
			</div>
		</el-dialog>
  </div>
</template>

<script>
import { getList, getListLocal, removeList, addList, editList} from '@/api/table'

export default {
  data() {
    return {
      filters: {
        name: ''
      },
      editFormVisible: false, // 编辑界面是否显示
      editLoading: false,
      // 编辑界面数据
      editForm: {
        id: 0,
        title: 'test',
        slug: '',
        date: '',
        category: '',
        tags: '',
        des: ''
      },
      editFormRules: {
        category: [
          { required: true, message: '请输入分类', trigger: 'blur' }
        ],
        tags: [
          { required: true, message: '请输入标签', trigger: 'blur' }
        ]
      },
      list: null,
      listLoading: true,
      addFormVisible: false, // 新增界面是否显示
      addLoading: false,
      addFormRules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ]
      },
      // 新增界面数据
      addForm: {
        title: 'test',
        slug: '',
        date: '',
        category: '',
        tags: '',
        des: ''
      }
    }
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  created() {
    console.log('create')
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      if (process.env.BASE_API.toString().match('http')) {
        console.log('fetchdata')
        getList(this.listQuery).then(response => {
          console.log(response)
          this.list = response.data
          this.listLoading = false
        })
      } else {
        getListLocal(this.listQuery).then(response => {
          console.log(response)
          this.list = response.data
          this.listLoading = false
        })
      }
    },
    // 获取用户列表
    getUsers() {
      const para = {
        page: this.page,
        name: this.filters.name
      }
      this.listLoading = true
      console.log(para)
      // NProgress.start();
      /* getUserListPage(para).then((res) => {
        this.total = res.data.total
        this.users = res.data.users
        this.listLoading = false
        // NProgress.done();
      })*/
    },
    // 显示编辑界面
    handleEdit(index, row) {
      console.log(row)
      this.editFormVisible = true
      this.editForm = Object.assign({}, row)
      console.log(this.editForm)
    },
    // 显示新增界面
    handleAdd() {
      console.log('add')
      this.addFormVisible = true
      this.addForm = {
        title: 'test',
        slug: 'test',
        date: '123',
        category: 'sfd',
        tags: 'a',
        des: 'fds'
      }
    },
    // 删除List
    handleDel(index, row) {
      console.log('delete')
      this.$confirm('确认删除该记录吗', '提示', {
        type: 'warning'
      }).then(() => {
        this.listLoading = true
        console.log(row)
        let para = { filename: row.title }
        removeList(para).then((res) => {
          this.listLoading = false
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.fetchData()
        })
      }).catch(() => {})
    },
    addSubmit() {
      this.$refs.addForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.addLoading = true;
							//NProgress.start();
							let para = Object.assign({}, this.addForm);
              addList(para).then((res) => {
								this.addLoading = false;
								//NProgress.done();
								this.$message({
									message: '提交成功',
									type: 'success'
								});
								this.$refs['addForm'].resetFields();
								this.addFormVisible = false;
								this.fetchData();
							});
						});
					}
				});
    },
    editSubmit() {
      this.$refs.editForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.addLoading = true;
							//NProgress.start();
							let para = Object.assign({}, this.editForm);
							editList(para).then((res) => {
								this.addLoading = false;
								//NProgress.done();
								this.$message({
									message: '提交成功',
									type: 'success'
								});
								this.$refs['editForm'].resetFields();
								this.editFormVisible = false;
								this.fetchData();
							});
						});
					}
				});
    }
  }
}
</script>
