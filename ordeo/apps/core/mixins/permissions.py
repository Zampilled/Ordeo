class PermissionsByActionMixin:
    def get_permission_classes(self):
        print(self.action)
        try:
            val = self.permission_classes_dict[self.action]
            print(f'val was {val}')
            if isinstance(val, dict):
                val = val.get(self.request.method, val.get("default", []))
        except (KeyError, AttributeError):
            return self.permission_classes
        return val if isinstance(val, (list, tuple)) else [val]

    def get_permissions(self):
        v = [permission() for permission in self.get_permission_classes()]
        print(v)
        return v
