const { Op } = require("sequelize");
const { slugify } = require("../lib/helpers");
const BaseModel = require("./_base");

module.exports = (sequelize, DataTypes) => {
  class Category extends BaseModel {
    static async create(category = undefined, options = undefined) {
      if (category && category.name) {
        category.name = category.name.trim();
        let slug = (category.slug = slugify(category.name));
        let count = 0;
        let exists = true;

        const categoriesWithSameSlug = await this.findAll({ where: { slug: { [Op.like]: `${slug}%` } } });

        do {
          const existing = categoriesWithSameSlug.find((c) => c.slug === slug);
          if (!existing) {
            exists = false;
            break;
          } else {
            count++;
            slug = `${category.slug}-${count}`;
          }
        } while (exists);

        category.slug = slug;
      }
      return super.create(category, { returing: true, ...options });
    }

    static async update(category = undefined, options = undefined) {
      if (category && category.name) {
        category.slug = slugify(category.name);
      }
      return super.update(category, { returing: true, ...options });
    }

    static async findBySlug(slug) {
      return await this.findOne({ where: { slug } });
    }

    static associate(models) {} // eslint-disable-line

    static init() {
      super.init(this.model(), { sequelize, underscored: true });
    }

    static schema() {
      return super.schema(DataTypes);
    }

    static model() {
      return {
        ...super.model(DataTypes),
        name: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notEmpty: true,
            len: [1, 255],
          },
        },
        slug: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
          validate: {
            notEmpty: true,
            len: [1, 255],
          },
          async set(value) {
            this.setDataValue("slug", slugify(value));
          },
        },
        description: {
          type: DataTypes.TEXT,
        },
        status: {
          type: DataTypes.INTEGER,
          defaultValue: 0,
          validate: {
            min: 0,
          },
        },
      };
    }
  }

  Category.init();

  exports.Category = Category;

  return Category;
};
