import { useResource } from '../useResource';
import { componentsApi } from '../../utils/api';
import { Component } from '../../types';

const mapComponent = (raw: any): Component => ({
  id: raw.id ?? raw.ID ?? 0,
  componentCode: raw.componentCode ?? raw.ComponentCode ?? '',
  description: raw.description ?? raw.Description ?? '',
  active: raw.active ?? raw.Active ?? true,
  createdAt: raw.createdAt ?? raw.CreatedAt ?? '',
  updatedAt: raw.updatedAt ?? raw.UpdatedAt,
});

export const useComponents = () => useResource<Component>(componentsApi, mapComponent);
