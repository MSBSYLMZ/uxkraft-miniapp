// migrations/20240101000000-create-all-tables.ts
import { DataTypes } from 'sequelize';

export default {
  async up(queryInterface) {
    // 1. Create spec table
    await queryInterface.createTable('spec', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    });

    // 2. Create location table
    await queryInterface.createTable('location', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    });

    // 3. Create category table
    await queryInterface.createTable('category', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    });

    // 4. Create phase table
    await queryInterface.createTable('phase', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    });

    // 5. Create address table
    await queryInterface.createTable('address', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    });

    // 6. Create vendor table (depends on address)
    await queryInterface.createTable('vendor', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      addressId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'address',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    });

    // 7. Create specItem table (main table with all foreign keys)
    await queryInterface.createTable('specItem', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      specId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'spec',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      locationId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'location',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'category',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      shipsToAddressId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'address',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      phaseId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'phase',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      vendorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'vendor',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      basePrice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      markupPercent: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false,
      },
      unitPrice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      quantity: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      unit: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      poApprovalDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      needBy: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      expectedDelivery: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      orderedDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      shippedDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      deliveredDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      shippingNotes: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      shopsSend: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      shopsApproved: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      shopsDelivered: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      note: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      attachment_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      attachment_url: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('specItem');
    await queryInterface.dropTable('vendor');
    await queryInterface.dropTable('address');
    await queryInterface.dropTable('phase');
    await queryInterface.dropTable('category');
    await queryInterface.dropTable('location');
    await queryInterface.dropTable('spec');
  },
};