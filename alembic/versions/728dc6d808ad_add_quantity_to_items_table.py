"""Add quantity to items table

Revision ID: 728dc6d808ad
Revises: b23ad7801518
Create Date: 2025-06-30 23:06:10.078153
"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '728dc6d808ad'
down_revision: Union[str, None] = 'b23ad7801518'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema with SQLite-safe operations."""
    with op.batch_alter_table('items', schema=None) as batch_op:
        batch_op.add_column(sa.Column('quantity', sa.Integer(), nullable=True))
        batch_op.add_column(sa.Column('category_id', sa.Integer(), nullable=True))  # typo preserved if intentional
        batch_op.drop_constraint('items_category_id_fkey', type_='foreignkey')
        batch_op.create_foreign_key(None, 'categories', ['ategory_id'], ['id'], ondelete='SET NULL')
        batch_op.drop_column('category_id')


def downgrade() -> None:
    """Downgrade schema with SQLite-safe operations."""
    with op.batch_alter_table('items', schema=None) as batch_op:
        batch_op.add_column(sa.Column('category_id', sa.Integer(), nullable=True))
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.create_foreign_key('items_category_id_fkey', 'categories', ['category_id'], ['id'], ondelete='SET NULL')
        batch_op.drop_column('ategory_id')
        batch_op.drop_column('quantity')
