import { DirectiveBinding } from 'vue';
import { useUserStore } from '@/store';

function checkPermission(el: HTMLElement, binding: DirectiveBinding) {
  const { value } = binding;
  const userStore = useUserStore();
  const { role } = userStore;

  // if (Array.isArray(value)) {
  // if (value.length > 0) {
  if (value) {
    const permissionValues = value;
    // const hasPermission = permissionValues.includes(role);
    const hasPermission = role.includes(permissionValues);
    if (!hasPermission && el.parentNode) {
      el.parentNode.removeChild(el);
    }
  }
  // } else {
  //   throw new Error(`need roles! Like v-permission="['admin','user']"`);
  // }
}

export default {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    checkPermission(el, binding);
  },
  updated(el: HTMLElement, binding: DirectiveBinding) {
    checkPermission(el, binding);
  },
};
