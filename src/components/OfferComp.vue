<template>
  <div
    class="w-full max-w-4xl mx-auto p-6 bg-base-100 rounded-xl shadow-lg h-[1000px] custom-scrollbar"
  >
    <div class="relative">
      <button
        class="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors btn absolute right-0"
        @click="closeForm"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
      <h1 class="text-3xl font-bold text-center mb-8">软件创新实验室申请表</h1>
    </div>

    <form @submit.prevent="submitForm" class="space-y-8">
      <!-- 基本信息 -->
      <div class="card bg-base-200 shadow-md">
        <div class="card-body">
          <h2 class="card-title text-xl font-semibold mb-4">基本信息</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="form-control w-full">
              <label class="label">
                <span class="label-text font-medium"
                  >姓名 <span class="text-error">*</span></span
                >
              </label>
              <input
                v-model="formData.name"
                type="text"
                placeholder="请输入姓名"
                class="input input-bordered w-full"
                required
              />
            </div>

            <div class="form-control w-full">
              <label class="label">
                <span class="label-text font-medium"
                  >电话号码 <span class="text-error">*</span></span
                >
              </label>
              <input
                v-model="formData.phone_number"
                type="tel"
                placeholder="请输入电话号码"
                class="input input-bordered w-full"
                required
              />
            </div>

            <div class="form-control w-full">
              <label class="label">
                <span class="label-text font-medium"
                  >电子邮箱 <span class="text-error">*</span></span
                >
              </label>
              <input
                v-model="formData.email"
                type="email"
                placeholder="请输入电子邮箱"
                class="input input-bordered w-full"
                required
              />
            </div>

            <div class="form-control w-full">
              <label class="label">
                <span class="label-text font-medium"
                  >微信号 <span class="text-error">*</span></span
                >
              </label>
              <input
                v-model="formData.wechat_number"
                type="text"
                placeholder="请输入微信号"
                class="input input-bordered w-full"
                required
              />
            </div>

            <div class="form-control w-full">
              <label class="label">
                <span class="label-text font-medium">所在寝室</span>
              </label>
              <input
                v-model="formData.location"
                type="text"
                placeholder="请输入所在寝室（可选）"
                class="input input-bordered w-full"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- 学术信息 -->
      <div class="card bg-base-200 shadow-md">
        <div class="card-body">
          <h2 class="card-title text-xl font-semibold mb-4">学术信息</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="form-control w-full">
              <label class="label">
                <span class="label-text font-medium"
                  >专业 <span class="text-error">*</span></span
                >
              </label>
              <input
                v-model="formData.major"
                type="text"
                placeholder="请输入专业"
                class="input input-bordered w-full"
                required
              />
            </div>

            <div class="form-control w-full">
              <label class="label">
                <span class="label-text font-medium"
                  >班级简称 <span class="text-error">*</span></span
                >
              </label>
              <input
                v-model="formData.class"
                type="text"
                placeholder="请输入班级简称"
                class="input input-bordered w-full"
                required
              />
            </div>
          </div>
        </div>
      </div>

      <!-- 个人目标 -->
      <div class="card bg-base-200 shadow-md">
        <div class="card-body">
          <h2 class="card-title text-xl font-semibold mb-4">个人目标</h2>
          <div class="space-y-4">
            <div class="form-control w-full">
              <label class="label">
                <span class="label-text font-medium"
                  >目标岗位 <span class="text-error">*</span></span
                >
              </label>
              <input
                v-model="formData.intent"
                type="text"
                placeholder="请输入目标岗位"
                class="input input-bordered w-full"
                required
              />
            </div>

            <div class="form-control w-full">
              <label class="label">
                <span class="label-text font-medium"
                  >个人简介 <span class="text-error">*</span></span
                >
              </label>
              <textarea
                v-model="formData.summary"
                placeholder="请简要介绍自己"
                class="textarea textarea-bordered h-24 w-full"
                required
              ></textarea>
            </div>
          </div>
        </div>
      </div>

      <!-- 技能与经验 -->
      <div class="card bg-base-200 shadow-md">
        <div class="card-body">
          <h2 class="card-title text-xl font-semibold mb-4">技能与经验</h2>
          <div class="space-y-4">
            <div class="form-control w-full">
              <label class="label">
                <span class="label-text font-medium"
                  >技能特长 <span class="text-error">*</span></span
                >
              </label>
              <textarea
                v-model="formData.skills"
                placeholder="请输入技能特长，如编程语言、工具等"
                class="textarea textarea-bordered h-24 w-full"
                required
              ></textarea>
            </div>

            <div class="form-control w-full">
              <label class="label">
                <span class="label-text font-medium">项目经验</span>
              </label>
              <textarea
                v-model="formData.project_experience"
                placeholder="请输入项目经验（可选）"
                class="textarea textarea-bordered h-24 w-full"
              ></textarea>
            </div>

            <div class="form-control w-full">
              <label class="label">
                <span class="label-text font-medium">证书资质</span>
              </label>
              <textarea
                v-model="formData.certifications"
                placeholder="请输入证书资质，如职业认证等（可选）"
                class="textarea textarea-bordered h-24 w-full"
              ></textarea>
            </div>

            <div class="form-control w-full">
              <label class="label">
                <span class="label-text font-medium">荣誉奖项</span>
              </label>
              <textarea
                v-model="formData.honor"
                placeholder="请输入荣誉奖项（可选）"
                class="textarea textarea-bordered h-24 w-full"
              ></textarea>
            </div>

            <div class="form-control w-full">
              <label class="label">
                <span class="label-text font-medium">语言能力</span>
              </label>
              <textarea
                v-model="formData.language"
                placeholder="请输入语言能力，如外语水平（可选）"
                class="textarea textarea-bordered h-24 w-full"
              ></textarea>
            </div>
          </div>
        </div>
      </div>

      <!-- 在线资料 -->
      <div class="card bg-base-200 shadow-md">
        <div class="card-body">
          <h2 class="card-title text-xl font-semibold mb-4">在线资料</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="form-control w-full">
              <label class="label">
                <span class="label-text font-medium">个人网站/博客</span>
              </label>
              <input
                v-model="formData.website"
                type="url"
                placeholder="请输入个人网站/博客链接（可选）"
                class="input input-bordered w-full"
              />
            </div>

            <div class="form-control w-full">
              <label class="label">
                <span class="label-text font-medium">GitHub账号</span>
              </label>
              <input
                v-model="formData.github"
                type="url"
                placeholder="请输入GitHub账号链接（可选）"
                class="input input-bordered w-full"
              />
            </div>
          </div>

          <div class="form-control w-full mt-4">
            <label class="label">
              <span class="label-text font-medium">补充信息</span>
            </label>
            <textarea
              v-model="formData.extra_info"
              placeholder="请输入补充信息（可选）"
              class="textarea textarea-bordered h-24 w-full"
            ></textarea>
          </div>
        </div>
      </div>

      <!-- 提交按钮 -->
      <div class="flex justify-center mt-8">
        <button
          type="submit"
          class="btn btn-primary btn-lg px-12"
          :disabled="isSubmitting"
        >
          {{ isSubmitting ? "提交中..." : "提交申请" }}
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped>
/* 自定义滚动条样式 */
.custom-scrollbar {
  overflow-y: auto;
  overflow-x: hidden;
}

/* 滚动条样式 - 适用于现代浏览器 */
.custom-scrollbar::-webkit-scrollbar {
  width: 8px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.05);
  border-radius: 4px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 4px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.3);
}

/* Firefox滚动条样式 */
.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: rgba(0, 0, 0, 0.2) rgba(0, 0, 0, 0.05);
}

.card {
  transition: all 0.3s ease;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow:
    0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.form-control {
  transition: all 0.2s ease;
}

.input:focus,
.textarea:focus {
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
}
</style>

<script lang="ts" setup>
import { ref } from "vue";
import { useEventBus } from "@vueuse/core";
import { submitResume } from "@/api/resume";
import { confirm } from "@/utils/confirm";

const bus = useEventBus("close-form");

const closeForm = () => {
  bus.emit();
};

export interface FormData {
  // 基本信息
  name: string;
  phone_number: string;
  email: string;
  wechat_number: string;
  location: string;

  // 个人目标
  intent: string;
  summary: string;

  // 学术信息
  major: string;
  class: string;

  // 技能与经验
  skills: string;
  project_experience: string;
  certifications: string;
  honor: string;
  language: string;

  // 在线资料
  website: string;
  github: string;
  extra_info: string;
}

const formData = ref<FormData>({
  name: "",
  phone_number: "",
  email: "",
  wechat_number: "",
  location: "",

  intent: "",
  summary: "",

  major: "",
  class: "",

  skills: "",
  project_experience: "",
  certifications: "",
  honor: "",
  language: "",

  website: "",
  github: "",
  extra_info: "",
});

const isSubmitting = ref(false);

const submitForm = () => {
  isSubmitting.value = true;

  // 这里将来添加HTTP请求发送相关的内容
  submitResume(formData.value)
    .then(() => {
      isSubmitting.value = false;
      confirm({
        message: "感谢您的加入，我们会在第一时间与您联系",
        confirmText: "确定",
        cancelText: "",
        title: "提交成功",
        onConfirm: () => {},
      });
    })
    .catch(() => {
      isSubmitting.value = false;
      confirm({
        message: "出现问题了，请检查您的网络或联系管理员处理",
        confirmText: "确定",
        cancelText: "",
        title: "提交失败",
        onConfirm: () => {},
      });
    });
};
</script>
