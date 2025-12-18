'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // 1. Create spec table
    await queryInterface.createTable('spec', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });

    // 2. Create location table
    await queryInterface.createTable('location', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });

    // 3. Create category table
    await queryInterface.createTable('category', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });

    // 4. Create phase table
    await queryInterface.createTable('phase', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });

    // 5. Create address table
    await queryInterface.createTable('address', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      address: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });

    // 6. Create vendor table (depends on address)
    await queryInterface.createTable('vendor', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      addressId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'address',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });

    // 7. Create specItem table (main table with all foreign keys)
    await queryInterface.createTable('specItem', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      specId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'spec',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      locationId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'location',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      categoryId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'category',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      shipsToAddressId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'address',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      phaseId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'phase',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      vendorId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'vendor',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      basePrice: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      markupPercent: {
        type: Sequelize.DECIMAL(5, 2),
        allowNull: false,
      },
      unitPrice: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      quantity: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      unit: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      poApprovalDate: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      needBy: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      expectedDelivery: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      orderedDate: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      shippedDate: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      deliveredDate: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      shipsFrom: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      shippingNotes: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      shopsSend: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      shopsApproved: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      shopsDelivered: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      note: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      attachment_name: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      attachment_url: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
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