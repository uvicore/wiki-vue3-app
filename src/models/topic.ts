import axios from 'axios';
import { inject } from 'vue';
import { Model, ModelConfig } from '@/uvicore/orm/model';
import { SectionModel } from '@/models/section';


//export class Topic extends Model<Topic>() {
export class TopicModel {
  // API Fields
  id: number
  slug: string
  name: string
  desc: string|null
  icon: string|null
  order: number
  section_id: number

  // Computed
  slug_full: string

  // Relations
  section: SectionModel|null

  static _config: ModelConfig = {
    connection: 'wiki',
    path: '/topics',
  }

  public constructor({id, slug, slug_full, name, desc, icon, order, section_id, section}: Topic) {
    //super();
    this.id = id
    this.slug = slug

    this.name = name
    this.desc = desc
    this.icon = icon
    this.order = order
    this.section_id = section_id

    this.slug_full = slug_full

    this.section = null

    // Convert relations into actual model class instances
    if (section) this.section = new SectionModel(section)
  }
}

export const useTopicModel = () => {
  class ModelFactory extends Model<TopicModel>(TopicModel) {}
  return new ModelFactory(inject('config'))
}

